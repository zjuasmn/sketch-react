import React from "react";
import {BooleanOperation} from 'sketch-constants'

export default class ShapeGroup extends React.Component {
  
  render() {
    let {model, children, style, ...props} = this.props;
    let {frame} = model;
    if (model.isSimple()) {
      style = {
        ...model.style.toStyle(model),
        ...style
      };
      return <div
        style={{
          position: 'absolute',
          height: frame.height,
          width: frame.width,
          top: frame.y,
          left: frame.x,
          ...style,
        }}
        {...props}
      >{
        !('background' in style) && model.style['fills'] && model.style['fills']
          .filter(fill => fill['isEnabled'])
          .map((fill, i) => <div
            key={i}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              width: '100%',
              ...fill.toStyle(model),
            }}
          />)
      }</div>
    } else {
      let ds = [];
      let d = '';
      for (let layer of model.layers) {
        if (layer['isVisible']) {
          if (layer['booleanOperation'] === BooleanOperation.Union) {
            ds.push(d);
            d = '';
          }
          d += layer.toD();
        }
      }
      ds.push(d);
      return <svg
        style={{
          position: 'absolute',
          height: frame.height,
          width: frame.width,
          top: frame.y,
          left: frame.x,
          ...model.style.toStyle(model, true),
          style,
        }}
        {...props}
      >
        {ds.map((d, i) => <path key={i} d={d}/>)}
      </svg>;
    }
    
  }
}