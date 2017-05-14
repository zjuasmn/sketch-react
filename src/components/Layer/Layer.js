import React from 'react'
import Page from './Page'
import Artboard from './Artboard'
import ShapeGroup from './ShapeGroup'
import Group from './Group'
import Symbol from './Symbol'
import Text from './Text'
import Bitmap from './Bitmap'
import {parse, getObjectById} from '../../utils'
class PlaceHolder extends React.Component {
  render() {
    let {model} = this.props;
    
    let {frame} = model;
    if (!frame) {
      debugger
    }
    return <div style={{
      position: 'absolute',
      height: frame.height,
      width: frame.width,
      top: frame.y,
      left: frame.x,
      background: `rgba(0,0,0,0.05)`,
      overflow: 'hidden'
    }}>{model._class}</div>;
  }
}
function getComp(_class) {
  switch (_class) {
    case 'mask':
      return Mask;
    case 'page':
      return Page;
    case 'artboard':
    case 'symbolMaster':
      return Artboard;
    case `shapeGroup`:
      return ShapeGroup;
    case `group`:
      return Group;
    case `text`:
      return Text;
    case `symbolInstance`:
      return Symbol;
    case `bitmap`:
      return Bitmap;
    default:
      return PlaceHolder;
  }
}
class Mask extends React.Component {
  render() {
    let {model, children, ...props} = this.props;
    let {frame} = model;
    
    let style = {
      position: 'absolute',
      overflow: 'hidden',
      height: frame.height,
      width: frame.width,
      top: frame.y,
      left: frame.x,
    };
    return (
      <div style={style} {...props}>
        {children}
      </div>);
  }
}
export default class Layer extends React.Component {
  render() {
    let {model} = this.props;
    let {layers, _class} = model;
    let Comp = getComp(_class);
    if (Comp === Symbol) {
      layers = getObjectById(model['symbolID']).layers;
    }
    // if (Comp !== Mask && layers) {
    //   let _layers = [];
    //   for (let i = 0; i < layers.length; ++i) {
    //     let m = layers[i];
    //     if (m.hasClippingMask && m.layers.length === 1 && !m.layers[0].edited
    //       && ( m.layers[0]._class === 'rectangle'
    //         || m.layers[0]._class === 'oval'
    //       )
    //     ) {
    //       let maskLayer = {
    //         ...layers[i],
    //         _class: 'mask',
    //       };
    //       let j;
    //       for (j = i; j < layers.length && !layers[j].shouldBreakMaskChain; ++j) {
    //         maskLayer.layers.push(layers[i]);
    //       }
    //       _layers.push(maskLayer);
    //       i = j;
    //     } else {
    //       _layers.push(layers[i]);
    //     }
    //   }
    //   layers = _layers;
    // }
    return <Comp {...this.props}>
      {layers && layers.map(layer => <Layer key={layer['do_objectID']} model={layer}/>)}
    </Comp>
  }
}