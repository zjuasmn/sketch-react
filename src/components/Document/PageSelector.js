import React from "react";


export default class PageSelector extends React.PureComponent {
  render() {
    let {model, selectedPage, onSelect, style, ...props} = this.props;
    return (
      <div style={{
        background: '#ececec',
        fontSize: 12,
        lineHeight: '27px',
        cursor: 'default',
        height: '100%', ...style
      }} {...props}>
        <div style={{
          paddingLeft: 16,
          background: '#F3F3F3',
          boxShadow: `inset 0 -1px 0 0 #B8B8B8`,
        }}>Pages
        </div>
        <div>
          {
            Object.keys(model).reverse().map((id, i) =>
              <div key={id} style={ id === selectedPage ? {
                paddingLeft: 32,
                color: 'white',
                background: '#6e9ee1',
              } : {
                paddingLeft: 32,
                background: i % 2 === 1 ? '#f0f0f0' : undefined,
                
              }} onClick={() => onSelect(id)}>{model[id].name}</div>
            )
          }
        </div>
      </div>);
  }
}