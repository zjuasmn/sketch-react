import React from "react";


export default class Symbol extends React.Component {
  render() {
    let {model: {frame}, style, ...props} = this.props;
    style = {
      position: 'absolute',
      height: frame.height,
      width: frame.width,
      top: frame.y,
      left: frame.x,
      ...style,
    };
    return <div style={style} {...props}/>;
  }
}