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
  return mask.isSimple && mask.isSimple();
}

export default class Group extends React.Component {
  render() {
    let {model, children, style, ...props} = this.props;
    let {frame} = model;
    
    
    let layoutStyles = model.getLayoutStyles();
    style = {
      position: 'absolute',
      height: frame.height,
      width: frame.width,
      top: frame.y,
      left: frame.x,
      ...model.style.toStyle(model),
      ...style,
      ...layoutStyles[model['do_objectID']]
    };
    
    children = React.Children.map(children, child => React.cloneElement(child, {style: layoutStyles[child.props.model['do_objectID']]}))
    
    if (!isMaskGroup(model)) {
      return (
        <div style={style} {...props}>
          {children}
        </div>);
    }
    let mask = model.layers[0];
    let maskStyle = mask.style.toStyle(mask);
    
    return (
      <div style={{
        ...style,
        overflow: 'hidden',
        height: mask.frame.height,
        width: mask.frame.width,
        top: mask.frame.y + frame.y,
        left: mask.frame.x + frame.x,
        borderRadius: maskStyle.borderRadius ? maskStyle.borderRadius : undefined,
      }} {...props}>{
        mask.frame.y || mask.frame.x ?
          <div style={{
            position: 'relative',
            top: -mask.frame.y !== 0 ? -mask.frame.y : undefined,
            left: -mask.frame.x !== 0 ? -mask.frame.x : undefined,
          }}>
            {children}
          </div>
          :
          children
      }
      
      </div>);
    
  }
}