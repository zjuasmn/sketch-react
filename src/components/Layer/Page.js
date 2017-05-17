import React from 'react'
import classnames from 'classnames'
import Artboard from "./Artboard";

export default class Page extends React.Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    let {model, children, ...props} = this.props;
    
    return (
      <div style={{
        position: 'relative',
      }} {...props}>
        
        {children}
        
        {model.layers.map(artboard => <div
          key={'title' + artboard['do_objectID']}
          style={{
            position: 'absolute',
            top: artboard.frame.y - 20,
            left: artboard.frame.x,
            color: artboard['_class'] === 'artboard' ? '#999' : '#8f44b7',
            fontSize: 12,
            pointerEvents:'none',
          }}>{artboard.name}</div>)}
      
      </div>);
  }
}
