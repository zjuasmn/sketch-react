import React from 'react'
import classnames from 'classnames'

export default class Artboard extends React.Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    let {model, children, ...props} = this.props;
    let {frame} = model;
    
    let style = {
      position:'absolute',
      height:frame.height,
      width:frame.width,
      top:frame.y,
      left:frame.x,
      background:model.backgroundColor.toString(),
      boxShadow:'rgba(0,0,0,0.3) 0 1px 4px 0',
      overflow:`hidden`,
    };
    return (
      <div style={style} {...props}>
        {children}
      </div>);
  }
}