import React from "react";


export default class Symbol extends React.Component {
  render() {
    let {model: {frame}, ...props} = this.props;
    let style = {
      position: 'absolute',
      height: frame.height,
      width: frame.width,
      top: frame.y,
      left: frame.x,
    };
    return <div style={style} {...props}/>;
  }
}