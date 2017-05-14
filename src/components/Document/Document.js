import React from 'react'
import classnames from 'classnames'
import JSZip from 'jszip'
import {parse} from '../../utils'
import 'babel-polyfill'
import Layer from "../Layer/Layer";
import PageSelector from './PageSelector'
import LayerSelector from "./LayerSelector";
export default class Document extends React.Component {
  constructor(props) {
    super(props);
    this.init(props);
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
      
      let minX = Infinity, minY = Infinity;// maxX = -Infinity, maxY = -Infinity;
      for (let layer of page.layers) {
        minX = Math.min(minX, layer.frame.x);
        minY = Math.min(minY, layer.frame.y);
        // maxX = Math.min(maxX, layer.frame.x + layer.frame.width);
        // maxY = Math.min(maxY, layer.frame.y + layer.frame.height);
      }
      minX -= 32;
      minY -= 32;
      for (let layer of page.layers) {
        layer.frame.x -= minX;
        layer.frame.y -= minY;
      }
      page.frame.x += minX;
      page.frame.y += minY
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
  
  render() {
    let {loading, selectedPage, meta, selectedLayer} = this.state;
    if (loading) {
      return <div>Loading...</div>
    } else {
      return (
        <div style={{
          display: 'flex',
          height: '100%',
        }}>
          <div style={{width: 240}}>
            <PageSelector model={meta.pagesAndArtboards} onSelect={this.selectPage}
                          selectedPage={selectedPage.do_objectID}
                          style={{
                            height: 149,
                            borderRight: '1px solid #B8B8B8'
                          }}
            />
            <LayerSelector model={selectedPage}
                           selectedLayer={selectedLayer}
                           onSelect={this.selectLayer}
                           style={{
                             height: `calc(100% - 149px)`,
                             borderRight: '1px solid #B8B8B8'
                           }}
            />
          </div>
          <div style={{
            position: 'relative',
            flex: 1,
          }}>
            <Layer model={selectedPage}/>
          </div>
        </div>
      );
    }
  }
}