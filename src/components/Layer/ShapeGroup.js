import React from "react";


export default class ShapeGroup extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let {model, children, ...props} = this.props;
    let {frame} = model;
    if (model.isSimple()) {
      let style = model.style.toStyle(model);
      return <div style={{
        position: 'absolute',
        height: frame.height,
        width: frame.width,
        top: frame.y,
        left: frame.x,
        overflow: 'hidden',
        ...style,
      }}
                  {...props}
      >{
        !('background' in style) && model.style['fills'] && model.style['fills']
          .filter(fill => fill['isEnabled'])
          .map((fill, i) => <div
            key={i}
            style={{
              height: '100%',
              width: '100%',
              ...fill.toStyle(model),
            }}
          />)
      }</div>
    } else {
      let d = '';
      for (let layer of model.layers) {
        if (layer['isVisible']) {
          d += layer.toD();
        }
      }
      return <svg style={{
        position: 'absolute',
        height: frame.height,
        width: frame.width,
        top: frame.y,
        left: frame.x,
        ...model.style.toStyle(model, true),
      }}
                  {...props}
      >
        <g>
          <path d={d}/>
        </g>
      </svg>;
    }
    
  }
}