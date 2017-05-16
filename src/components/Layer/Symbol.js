import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'


export default class Symbol extends React.Component {
  static childContextTypes = {
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func,
  };
  
  getChildContext() {
    return {
      onClick: () => this.selectLayer(this.props.model.do_objectID),
      onMouseEnter: () => false,
      onMouseLeave: () => false,
    };
  }
  
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