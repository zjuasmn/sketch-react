import React from 'react'
import classnames from 'classnames'
import JSZip from 'jszip'
import {parse, getObjectById, clear, objectMapping} from '../../utils'
import 'babel-polyfill'
import Layer from "../Layer/Layer";
import PageSelector from './PageSelector'
import LayerSelector from "./LayerSelector";
import PropTypes from 'prop-types'
import styles from './Document.styl'
import LayerIndicator from './LayerIndicator'
import throttle from 'lodash/throttle'
import Perf from 'react-addons-perf'
window.Perf = Perf;
export default class Document extends React.PureComponent {
  static propTypes = {
    blob: PropTypes.instanceOf(Blob),
  };
  static childContextTypes = {
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
  };
  
  constructor(props) {
    super(props);
    this.layerStack = [];
    this.init(props);
    this.throttleSetState = this.setState;
  }
  
  getChildContext() {
    return {
      onClick: this.selectLayer,
      onMouseEnter: this.onLayerEnter,
      onMouseLeave: this.onLayerLeave
    };
  }
  
  componentWillUnmount() {
    clear();
  }
  
  async init(props) {
    this.state = {loading: true};
    let zip = await JSZip.loadAsync(await props.blob);
    
    let json = JSON.parse(await zip.file('document.json')
      .async('string'));
    let meta = JSON.parse(await zip.file('meta.json')
      .async('string'));
    let model = parse(json, zip);
    for (let i = 0; i < model.pages.length; ++i) {
      let page = model.pages[i] = await model.pages[i].getInstance();
  
      let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
      for (let layer of page.layers) {
        minX = Math.min(minX, layer.frame.x);
        minY = Math.min(minY, layer.frame.y);
        maxX = Math.max(maxX, layer.frame.x + layer.frame.width);
        maxY = Math.max(maxY, layer.frame.y + layer.frame.height);
      }
      minX -= 32;
      minY -= 32;
      maxX += 32;
      maxY += 32;
      for (let layer of page.layers) {
        layer.frame.x -= minX;
        layer.frame.y -= minY;
      }
      page.frame.x = 0;
      page.frame.y = 0;
      page.frame.width = maxX - minX;
      page.frame.height = maxY - minY;
      console.log(page.frame);
    }
    this.zip = zip;
    this.model = model;
    this.setState({loading: false, selectedPage: model.pages[0], meta});
  }
  
  selectPage = (pageID) => {
    for (let i = 0; i < this.model.pages.length; ++i) {
      if (this.model.pages[i].do_objectID === pageID) {
        return this.setState({selectedPage: this.model.pages[i]});
      }
    }
  };
  selectLayer = (layerID) => {
    return this.setState({selectedLayer: layerID});
  };
  onLayerEnter = (layerID) => {
    this.layerStack.push(layerID);
    this.throttleSetState({hoveredLayer: this.layerStack[this.layerStack.length - 1]});
  };
  onLayerLeave = (layerID) => {
    if (this.layerStack.length === 0 || layerID !== this.layerStack[this.layerStack.length - 1]) {
      console.error('cannot pop layer', this.layerStack, layerID);
    }
    this.layerStack.pop();
    this.throttleSetState({hoveredLayer: this.layerStack[this.layerStack.length - 1]});
  };
  
  render() {
    let {loading, selectedPage, meta, selectedLayer, hoveredLayer} = this.state;
    let {blob, ...props} = this.props;
    if (loading) {
      return <div>Loading...</div>
    } else {
      return (
        <div className={styles.document} {...props}>
          <aside className={styles['sidebar-selector']}>
            <PageSelector model={meta.pagesAndArtboards} onSelect={this.selectPage}
                          selectedPage={selectedPage.do_objectID}
                          style={{
                            height: 27 * 5,
                          }}
            />
            <LayerSelector model={selectedPage}
                           selectedLayer={selectedLayer}
              // hoveredLayer={hoveredLayer}
                           onMouseEnter={this.onLayerEnter}
                           onMouseLeave={this.onLayerLeave}
                           onSelect={this.selectLayer}
                           style={{
                             height: `calc(100% - 135px)`,
                           }}
            />
          </aside>
          <div className={styles.main}>
            <div className={styles.canvas} id="canvas" style={{
              position: 'relative',
              width: selectedPage.frame.width,
              height: selectedPage.frame.height,
            }}>
              <Layer model={selectedPage}/>
              <LayerIndicator selectedLayer={selectedLayer} hoveredLayer={hoveredLayer}/>
            </div>
          </div>
          <aside className={styles['sidebar-info']}>
            info
          </aside>
        </div>
      );
    }
  }
}