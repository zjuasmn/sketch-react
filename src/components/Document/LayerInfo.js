import React from "react";
import PropTypes from "prop-types";
import styles from "./Document.styl";
import hljs from 'highlight.js'
import select from 'select'

require('highlight.js/styles/color-brewer.css');
import {getReactCode} from '../../utils'
const NodeTypes = {
  Element: 1,
};
function removeIds(o) {
  if (o.nodeType === NodeTypes.Element) {
    o.removeAttribute('id');
    if (o.nodeName !== 'SVG') {
      for (let child of o.childNodes) {
        removeIds(child);
      }
    }
  }
}

function getOuterHtmlCode(o, depth = 0, jsx = false) {
  let spaces = '';
  for (let i = 0; i < depth; ++i) {
    spaces += '  ';
  }
  let tagName = o.tagName.toLowerCase();
  switch (tagName) {
    case 'img':
    case 'path':
    case 'span':
      return `${spaces}${o.outerHTML}\n`;
    default:
      return `${spaces}<${tagName} style="${o.style.cssText}">\n${Array.prototype.map.call(o.childNodes, child => getOuterHtmlCode(child, depth + 1)).join('')}${spaces}</${tagName}>\n`
  }
}
export default class LayerInfo extends React.Component {
  
  static propTypes = {
    layer: PropTypes.string,
  };
  
  componentWillMount() {
    this.state = {codeMode: 'react'};
  }
  
  selectCodeMode = (e) => {
    this.setState({codeMode: e.target.value});
  };
  
  render() {
    let {layer} = this.props;
    if (!layer) {
      return <div className={styles['info']}>
        <div className={styles['empty']}>Select a layer</div>
      </div>
    } else {
      let _o = document.getElementById(layer);
      let o = _o.cloneNode();
      o.innerHTML = _o.innerHTML;
      removeIds(o);
      o.style.cssText = o.style.cssText.replace(/top:[^;]*;/, '').replace(/left:[^;]*;/, '');
      let ratio = _o.clientWidth > 208 ? 208 / _o.clientWidth : 1;
      
      return <div className={styles['info']}>
        <div className={styles['section']}>
          <div className={styles['section-header']}>Preview</div>
          <div className={styles['previewer']}>
            <div
              dangerouslySetInnerHTML={{__html: o.outerHTML}}
              style={{
                position: 'relative',
                width: _o.clientWidth,
                height: _o.clientHeight * ratio,
                transformOrigin: 'left top',
                transform: `scale(${ratio})`,
              }}/>
          </div>
        </div>
        <div className={styles['section']}>
          <div className={styles['section-header']}>CSS (outer)</div>
          <pre className={styles['code']}
               dangerouslySetInnerHTML={{__html: hljs.highlight('css', o.style.cssText.replace(/;\s+/g, ';\n')).value}}/>
        </div>
        <div className={styles['section']}>
          <div className={styles['section-header']}>
            <span>Code</span>
            <select style={{marginLeft: 8}} onChange={this.selectCodeMode} value={this.state.codeMode}>
              <option value='html'>html</option>
              <option value='react'>react</option>
            </select>
            <a onClick={() => select(document.getElementById('code'))} style={{
              float: 'right',
              fontWeight: 'normal',
              marginRight: 8,
              color: '#6e9ee1',
              cursor: 'pointer',
            }}>select code</a>
          </div>
          {this.state.codeMode === 'html' ?
            <pre id='code' className={styles['code']}
                 dangerouslySetInnerHTML={{__html: hljs.highlight('xml', getOuterHtmlCode(o)).value}}>
          </pre> :
            <pre id='code' className={styles['code']}
                 dangerouslySetInnerHTML={{__html: hljs.highlight('jsx', getReactCode(o)).value}}>
          </pre>
          }
        </div>
      </div>;
    }
  }
}