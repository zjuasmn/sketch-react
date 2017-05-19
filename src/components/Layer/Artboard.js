import React from 'react'
import Group from './Group'

export default class Artboard extends Group {
  render() {
    let {style, ...props} = this.props;
    return <Group
      style={      {
        ...style,
        background: this.props.model.backgroundColor.toString(),
        boxShadow: 'rgba(0,0,0,0.3) 0 1px 4px 0',
        overflow: `hidden`,
      }} {...props} />;
  }
}