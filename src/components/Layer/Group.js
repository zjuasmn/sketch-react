import React from "react";

function isMaskGroup(model) {
  if (!(model.layers && model.layers.length > 1 && model.layers[0].hasClippingMask)) {
    return false;
  }
  for (let layer of model.layers) {
    if (layer.shouldBreakMaskChain) {
      return false;
    }
  }
  let mask = model.layers[0];
  if (mask.layers.length === 1 && !mask.layers[0].edited
    && ( mask.layers[0]._class === 'rectangle'
      || mask.layers[0]._class === 'oval'
    )) {
    return true;
  }
  return false;
}
export default class Group extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let {model, children, ...props} = this.props;
    let {frame} = model;
    
    let style = {
      position: 'absolute',
      height: frame.height,
      width: frame.width,
      top: frame.y,
      left: frame.x,
      ...model.style.toStyle(model)
    };
    
    if (!isMaskGroup(model)) {
      return (
        <div style={style} {...props}>
          {children}
        </div>);
    }
    let mask = model.layers[0];
    return (
      <div style={{
        ...style,
        overflow: 'hidden',
        height: mask.frame.height,
        width: mask.frame.width,
        top: mask.frame.y + frame.y,
        left: mask.frame.x + frame.x,
        borderRadius: mask.style.toStyle(mask).borderRadius,
      }} {...props}>
        <div style={{
          position: 'absolute',
          height: frame.height,
          width: frame.width,
          top: -mask.frame.y,
          left: -mask.frame.x,
        }}>
          {children}
        </div>
      </div>);
    
  }
}