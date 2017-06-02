import React from 'react'
import prettyBytes from '../../utils/pretty-bytes'

export default class Loading extends React.Component {
  render() {
    let {filename, progress = {total: 0, loaded: 0}, onCancel, style, ...props} = this.props;
    let ratio = progress.total ? progress.loaded / progress.total : 0;
    return (
      <div style={{
        position: 'relative',
        width: '320px',
        ...style
      }}
           {...props}>
        <h2 style={{
          fontSize: 18,
          fontWeight: 'normal',
          color: 'rgb(51, 51, 51)',
          textAlign: 'center',
        }}>{filename}</h2>
        <div style={{
          height: 12,
          marginTop: 16,
          borderRadius: 6,
          background: 'rgb(216, 216, 216)'
        }}>
          <div style={{
            height: 12,
            width: (ratio * 320),
            borderRadius: 6,
            background: 'rgb(245, 166, 35)',
            transition: 'width ease 100ms'
          }}/>
        </div>
        <span style={{
          display: 'block',
          position: 'absolute',
          top: '60px',
          right: 0,
          overflow: 'hidden',
          fontSize: 16,
          color: 'rgb(51, 51, 51)',
          textAlign: 'right',
          whiteSpace: 'nowrap'
        }}>{prettyBytes(progress.total)}</span>
        <span style={{
          display: 'block',
          position: 'absolute',
          top: '60px',
          left: '0px',
          overflow: 'hidden',
          fontSize: '16px',
          color: 'rgb(51, 51, 51)',
          whiteSpace: 'nowrap'
        }}>{`${(ratio * 100).toFixed(2)}%`}</span>
        <a style={{
          cursor: 'pointer',
          position: 'absolute',
          height: '32px',
          width: '320px',
          top: '99px',
          left: '0px',
          boxSizing: 'border-box',
          borderRadius: '4px',
          textAlign: 'center',
          fontSize: '16px',
          color: 'rgb(255, 255, 255)',
          lineHeight: '32px',
          background: 'linear-gradient(0deg, rgb(74, 144, 226), rgb(74, 144, 226))'
        }}
           onClick={onCancel}
        >
          Cancel
        </a>
      </div>
    );
  }
}