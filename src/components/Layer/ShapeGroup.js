import React from 'react'
import classnames from 'classnames'


export default class ShapeGroup extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let {model, children, ...props} = this.props;
    let {frame} = model;
    // if (!model['isEnabled']){
    //   return false;
    // }
    if (model.layers.length === 1 && !model.layers[0].edited
      && ( model.layers[0]._class === 'rectangle'
        || model.layers[0]._class === 'oval' && frame.height === frame.width
      )
    ) {
      return <div style={{
        position: 'absolute',
        height: frame.height,
        width: frame.width,
        top: frame.y,
        left: frame.x,
        overflow: 'hidden',
        ...model.style.toStyle(model),
      }}>{
        model.style['fills'] && model.style['fills']
          .filter(fill => fill['isEnabled'])
          .map((fill,i) => <div
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
      }}>
        <g>
          <path d={d}/>
        </g>
      </svg>;
    }
    
  }
}