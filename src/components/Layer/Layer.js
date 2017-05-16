import React from "react";
import Page from "./Page";
import Artboard from "./Artboard";
import ShapeGroup from "./ShapeGroup";
import Group from "./Group";
import SymbolInstance from "./Symbol";
import Text from "./Text";
import Bitmap from "./Bitmap";
import {getSymbolById} from "../../utils";
import PropTypes from "prop-types";

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
      return SymbolInstance;
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
export default class Layer extends React.PureComponent {
  static contextTypes = {
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
  };
  onClick = (e) => {
    if (this.props.inSymbol) {
      return;
    }
    this.context.onClick(this.props.model.do_objectID);
    e.stopPropagation();
  };
  onMouseEnter = (e) => {
    if (this.props.inSymbol) {
      return;
    }
    this.context.onMouseEnter(this.props.model.do_objectID);
    // e.stopPropagation();
  };
  onMouseLeave = (e) => {
    if (this.props.inSymbol) {
      return;
    }
    this.context.onMouseLeave(this.props.model.do_objectID);
    // e.stopPropagation();
  };
  
  render() {
    let {model, inSymbol, ...props} = this.props;
    let {layers, _class} = model;
    let Comp = getComp(_class);
    if (Comp === SymbolInstance) {
      layers = getSymbolById(model['symbolID']).layers;
    }
    return <Comp {...props} id={model.do_objectID}
                 model={model}
                 onClick={this.onClick}
                 onMouseEnter={this.onMouseEnter}
                 onMouseLeave={this.onMouseLeave}
    >
      {layers && layers.map(layer => <Layer key={layer['do_objectID']} model={layer}
                                            inSymbol={!!inSymbol || Comp === SymbolInstance}/>)}
    </Comp>
  }
}