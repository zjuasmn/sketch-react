import React from "react";
import PropTypes from "prop-types";
import styles from "./Document.styl";

export default class LayerInfo extends React.Component {
  static propTypes = {
    layer: PropTypes.string,
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
      o.removeAttribute('id');
      o.style.cssText += ';position:relative;top:0;left:0';
      let ratio = _o.clientWidth > 208 ? 208 / _o.clientWidth : 1;
      
      return <div className={styles['info']}>
        <div className={styles['section']}>
          <div className={styles['section-header']}>Preview</div>
          <div className={styles['previewer']}>
            <div dangerouslySetInnerHTML={{__html: o.outerHTML}}
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
          <pre className={styles['code']} style={{whiteSpace: 'pre-line'}}>
            {o.style.cssText.replace(/;\s+/g, ';\n')}
          </pre>
        </div>
        <div className={styles['section']}>
          <div className={styles['section-header']}>Code</div>
          <pre className={styles['code']}>
            {o.outerHTML}
          </pre>
        </div>
      </div>;
    }
  }
}