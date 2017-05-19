import React from 'react'
import Group from './Group'

export default class Artboard extends Group {
  render() {
    let {style, ...props} = this.props;
    return <Group
      style={      {
        ...style,
        background: this.props.model.hasBackgroundColor ? this.props.model.backgroundColor.toString() : undefined,
        boxShadow: 'rgba(0,0,0,0.3) 0 1px 4px 0',
        overflow: `hidden`,
      }} {...props} />;
  }
}