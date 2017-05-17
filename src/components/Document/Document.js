import React from "react";
import JSZip from "jszip";
import {clear, parse} from "../../utils";
import "babel-polyfill";
import Layer from "../Layer/Layer";
import PageSelector from "./PageSelector";
import LayerSelector from "./LayerSelector";
import PropTypes from "prop-types";
import styles from "./Document.styl";
import LayerIndicator from "./LayerIndicator";
import LayerInfo from "./LayerInfo";
import Resolve from 'react-utilities/Resolve'
import {Document as DocumentClass} from '../../models'

let errorPage = <div className={styles['document-error']}>
  <h1>Cannot parse this file</h1>
<p>If the file is from old-version sketch, open it with new version(v43 or newer) sketch and save to convert.</p>
<p>If you find any issue, please {' '}<a href="https://github.com/zjuasmn/react-utilities/issues">feedback</a>
{' '} to me. Thank you.</p></div>;

export default class Document extends React.PureComponent {
  static propTypes = {
    blob: PropTypes.oneOfType([
      PropTypes.instanceOf(Blob),
      PropTypes.instanceOf(Promise),
    ])
  };
  
  componentWillMount() {
    this.document$ = this.loadBlob(this.props.blob);
  }
  
  componentWillUnmount() {
    clear();
  }
  
  async loadBlob(blob) {
    let zip = await JSZip.loadAsync(await blob);
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
    }
    model.meta = meta;
    return model;
  }
  
  render() {
    let {blob,...props} = this.props;
    return <Resolve promise={this.document$} name="model" {...props}
      pending={<div className={styles['document-loading']}/>}
                    rejected={errorPage}
    >
      <DocumentViewer />
    </Resolve>
  }
}
class DocumentViewer extends React.PureComponent {
  static propTypes = {
    model: PropTypes.instanceOf(DocumentClass),
  };
  static childContextTypes = {
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
  };
  
  constructor(props) {
    super(props);
    this.state = {};
    this.layerStack = [];
    this.model = this.props.model;
  }
  
  getChildContext() {
    return {
      onClick: this.selectLayer,
      onMouseEnter: this.onLayerEnter,
      onMouseLeave: this.onLayerLeave
    };
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
    this.setState({hoveredLayer: this.layerStack[this.layerStack.length - 1]});
  };
  onLayerLeave = (layerID) => {
    if (this.layerStack.length === 0 || layerID !== this.layerStack[this.layerStack.length - 1]) {
      console.error('cannot pop layer', this.layerStack, layerID);
    }
    this.layerStack.pop();
    this.setState({hoveredLayer: this.layerStack[this.layerStack.length - 1]});
  };
  
  componentWillMount() {
    this.state = {selectedPage: this.props.model.pages[0]};
  }
  
  render() {
    let {selectedPage, selectedLayer, hoveredLayer} = this.state;
    let {model, ...props} = this.props;
    
    return (
      <div className={styles.document} {...props}>
        <aside className={styles['sidebar-selector']}>
          <PageSelector model={model.meta}
                        onSelect={this.selectPage}
                        selectedPage={selectedPage.do_objectID}
                        style={{height: 27 * 5,}}
          />
          <LayerSelector model={selectedPage}
                         selectedLayer={selectedLayer}
            // hoveredLayer={hoveredLayer}
                         onMouseEnter={this.onLayerEnter}
                         onMouseLeave={this.onLayerLeave}
                         onSelect={this.selectLayer}
                         style={{height: `calc(100% - 135px)`,}}
          />
        </aside>
        < div className={styles.main}>
          <div className={styles.canvas} id="canvas" style={{
            width: selectedPage.frame.width,
            height: selectedPage.frame.height,
          }}>
            <Layer model={selectedPage}/>
            <LayerIndicator selectedLayer={selectedLayer} hoveredLayer={hoveredLayer}/>
          </div>
        </div>
        
        <aside className={styles['sidebar-info']}>
          <LayerInfo layer={selectedLayer}/>
        </aside>
      </div>
    
    );
  }
}