import React from 'react'
import classnames from 'classnames'

export default class Text extends React.Component {
  render() {
    let {model, style, ...props} = this.props;
    let {frame} = model;
    
    return <span style={{
      display: 'block',
      position: 'absolute',
      top: frame.y,
      left: frame.x,
      overflow: 'hidden',
      ...model.style.textStyle.toStyle(model),
      ...style,
    }}
                 {...props}
    >{model.attributedString.archivedAttributedString.NSString}</span>;
  }
}