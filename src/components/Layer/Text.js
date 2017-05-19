import React from 'react'
import classnames from 'classnames'

export default class Text extends React.Component {
  render() {
    let {model, ...props} = this.props;
    let {frame} = model;
    
    return <span style={{
      position: 'absolute',
      top: frame.y,
      left: frame.x,
      overflow: 'hidden',
      ...model.style.textStyle.toStyle(model),
    }}
                 {...props}
    >{model.attributedString.archivedAttributedString.NSString}</span>;
  }
}