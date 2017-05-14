import React from 'react'
import classnames from 'classnames'

export default class Symbol extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let {model, children} = this.props;
    let {frame} = model;

    let style = {
      position:'absolute',
      height:frame.height,
      width:frame.width,
      top:frame.y,
      left:frame.x,
    };
    return <div style={style}>{children}</div>;
  }
}