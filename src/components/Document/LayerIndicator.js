import React from "react";
import PropTypes from "prop-types";
import {getObjectById} from "../../utils";
import styles from "./Document.styl";
function getp(a1, a2, b1, b2) { // a1 <= a2, b1 <= b2, select a, hover b
  if (b1 <= a1 && a2 <= b2) {
    return (a1 + a2) / 2;
  } else {
    return (b1 + b2) / 2;
  }
}
function f(a1, a2, b1, b2) {// a1 <= a2, b1 <= b2
  if (a1 > b1) {
    return f(b1, b2, a1, a2);
  }
  // a1 <= b1
  if (a2 < b1) {
    return [[a2, b1]]
  }
  if (a2 < b2) {
    return [[a1, b1], [a2, b2]];
  }
  return [[a1, b1], [b2, a2]];
}
function hLine(x1, x2, y, i) {
  return <div key={`h${i}`} className={styles['frame']}
              style={{
                left: x1,
                width: x2 - x1,
                top: y,
                height: 1,
                background: '#fa571f',
              }}>
    <div className={styles['frame']}
         style={{
           left: 0, top: -2, height: 5, width: '100%',
           boxShadow: `inset -1px 0 0 0 #fa571f, inset 1px 0 0 0 #fa571f`
         }}/>
    <div className={styles['frame-note']}
         style={{left: '50%', top: -10}}>
      {`${Math.round(x2 - x1)}px`}
    </div>
  </div>
}
function vLine(y1, y2, x, i) {
  return <div key={`v${i}`} className={styles['frame']}
              style={{
                left: x,
                width: 1,
                top: y1,
                height: y2 - y1,
                background: '#fa571f',
              }}>
    <div className={styles['frame']}
         style={{
           left: -2, top: 0, height: '100%', width: 5,
           boxShadow: `inset 0 -1px 0 0 #fa571f, inset 0 1px 0 0 #fa571f`
         }}/>
    <div className={styles['frame-note']}
         style={{top: '50%', transform: `translateY(-50%)`, left: 2}}>
      {`${Math.round(y2 - y1)}px`}
    </div>
  </div>
}
function gao(a, b, o) {// select a, hover b, canvas o
  let [ax1, ax2, ay1, ay2] = [a.left - o.left, a.left + a.width - o.left, a.top - o.top, a.top + a.height - o.top];
  let [bx1, bx2, by1, by2] = [b.left - o.left, b.left + b.width - o.left, b.top - o.top, b.top + b.height - o.top];
  let x = getp(ax1, ax2, bx1, bx2);
  let y = getp(ay1, ay2, by1, by2);
  let hLines = f(ax1, ax2, bx1, bx2).filter(([a, b]) => b - a > 0.5).map(([left, right], i) =>
    hLine(left, right, y, i));
  let vLines = f(ay1, ay2, by1, by2).filter(([a, b]) => b - a > 0.5).map(([top, bottom], i) =>
    vLine(top, bottom, x, i));
  return hLines.concat(vLines);
}

export default class LayerIndicator extends React.PureComponent {
  static propTypes = {
    selectedLayer: PropTypes.string,
    hoveredLayer: PropTypes.string,
  };
  
  render() {
    let {selectedLayer, hoveredLayer} = this.props;
    if (!selectedLayer && !hoveredLayer) {
      return false
    }
    let canvasDOM = document.getElementById('canvas');
    let hoveredDOM = document.getElementById(hoveredLayer);
    let selectedlayerDOM = document.getElementById(selectedLayer);
    
    let r = selectedlayerDOM && selectedlayerDOM.getBoundingClientRect();
    let b = hoveredDOM && hoveredDOM.getBoundingClientRect();
    let o = canvasDOM.getBoundingClientRect();
    let selectedmodel = getObjectById(selectedLayer);
    return (
      <div>
        {b && <div className={styles['frame-hovered']} style={{
          width: b.width,
          height: b.height,
          left: b.left - o.left,
          top: b.top - o.top,
        }}/>}
        {r && b && gao(r, b, o)}
        {r && <div className={styles['frame-selected']} style={{
          width: r.width,
          height: r.height,
          left: r.left - o.left,
          top: r.top - o.top,
        }}>
          <div className={styles['frame-expand']} style={{
            width: o.width,
            height: r.height,
            left: o.left - r.left,
            top: -1,
            borderWidth: `1px 0`
          }}/>
          <div className={styles['frame-expand']} style={{
            width: r.width,
            height: o.height,
            left: -1,
            top: o.top - r.top,
            borderWidth: `0 1px`
          }}/>
          { (r && !b || selectedLayer === hoveredLayer) &&
          <div className={styles['frame-note']} style={{
            top: -10,
            left: '50%',
          }}>{`${Math.round(selectedmodel.frame.width)}px`}
          </div>
          }
          { (r && !b || selectedLayer === hoveredLayer) &&
          <div className={styles['frame-note']} style={{
            left: r.width + 2,
            top: '50%',
            transform: 'translateY(-50%)'
          }}>{`${Math.round(selectedmodel.frame.height)}px`}
          </div>
          }
        </div>}
      
      </div>
    );
    
  }
}