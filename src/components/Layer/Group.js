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
function isColumnGroup(model) {
  let layers = model.layers;
  let arr = [];
  for (let i = 0; i < layers.length; ++i) {
    arr.push({
      i,
      top: layers[i].frame.top,
      bottom: layers[i].frame.top + layers[i].frame.height,
    });
  }
  arr.sort((a, b) => a.top - b.top);
  let sameGap = true;
  for (let i = 1; i < layers.length; ++i) {
    if (arr[i - 1].bottom > arr[i].top) {
      return false;
    }
    if (i > 1 && arr[i].top - arr[i - 1].bottom !== arr[i - 1].top - arr[i - 2].bottom) {
      sameGap = false;
    }
  }
  
  for (let i = 0; i < layers.length; ++i) {
    let layer = model.layers[arr[i].i];
    let leftGap = layer.frame.left - model.frame.left;
    let rightGap = model.frame.left + model.frame.width - layer.frame.left - layer.frame.width;
    if (leftGap === rightGap) {
      if (leftGap !== 0) {
        arr[i].width = layer.frame.left + layer.frame.width;
        arr[i].margin = '0px auto';
      }
    }
  }
  return true;
}

export default class Group extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let {model, children, style, ...props} = this.props;
    let {frame} = model;
    
    style = {
      ...style,
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