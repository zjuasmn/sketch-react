import "babel-polyfill";
import {BlendingMode, CurvePointMode, FillType} from "sketch-constants";
import kebabCase from "lodash/kebabCase";


export class Page {
  static _class = 'page';
}

export class Rect {
  static _class = 'rect';
  
  set x(_x) {
    this._x = _x;
  }
  
  get x() {
    return Math.round(this._x);
  }
  
  set y(_y) {
    this._y = _y;
  }
  
  get y() {
    return Math.round(this._y);
  }
  
  set width(_width) {
    this._width = _width;
  }
  
  get width() {
    return Math.round(this._width);
  }
  
  set height(_height) {
    this._height = _height;
  }
  
  get height() {
    return Math.round(this._height);
  }
}
export class ShapeGroup {
  static _class = 'shapeGroup';
  
  isSimple() {
    let {layers} = this;
    if (layers && layers.length === 1 && !layers[0]['edited']) {
      if (layers[0] instanceof Oval && this.frame.width === this.frame.height) {
        return true;
      }
      if (layers[0] instanceof Rectangle) {
        return true;
      }
    }
    return false;
  }
}
export class Group {
  static _class = 'group';
  
  
  wrapperFrame(layers) {
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    for (let layer of layers) {
      minX = Math.min(minX, layer.frame.x);
      minY = Math.min(minY, layer.frame.y);
      maxX = Math.max(maxX, layer.frame.x + layer.frame.width);
      maxY = Math.max(maxY, layer.frame.y + layer.frame.height);
    }
    minX = Math.max(minX, 0);
    maxX = Math.min(maxX, this.frame.width);
    minY = Math.max(minY, 0);
    maxY = Math.min(maxY, this.frame.height);
    
    return {x: minX, y: minY, width: maxX - minX, height: maxY - minY};
  }
  
  getLayoutStyles() {
    let {layers} = this;
    
    let visibleLayers = layers.filter(layer => layer.isVisible);
    if (!visibleLayers.length) {
      return {};
    }
    let styles = {[this['do_objectID']]: {}};
    visibleLayers.forEach(layer => {
      styles[layer['do_objectID']] = {};
    });
    // single layer
    if (visibleLayers.length === 1) {
      return {
        [visibleLayers[0]['do_objectID']]: {
          position: 'relative',
          left: undefined,
          top: undefined,
          height: '100%',
          width: undefined,
        }
      };
    }
    // check bg layer
    let {y, x, width, height} = visibleLayers[0].frame;
    
    let hasBgLayer = false;
    if (y === 0 && x === 0 && width === this.frame.width && height === this.frame.height) {
      hasBgLayer = true;
    }
    if (hasBgLayer) {
      styles[visibleLayers[0]['do_objectID']] = {
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        width: '100%',
      };
      visibleLayers.splice(0, 1);
    }
    // for column layout
    // if (this['do_objectID'] === "9FFA94D8-633C-44A0-9DDA-F8B2A2EE970C") {
    //   debugger
    // }
    let innerFrame = this.wrapperFrame(visibleLayers);
    if (innerFrame.x !== 0 || innerFrame.y !== 0 || innerFrame.width !== this.frame.width || innerFrame.height !== this.frame.height) {
      Object.assign(styles[this['do_objectID']], {
        boxSizing: 'border-box',
        padding: `${innerFrame.y}px ${this.frame.width - innerFrame.width - innerFrame.x}px ${this.frame.height - innerFrame.height - innerFrame.y}px ${innerFrame.x}px`,
      });
    }
    // visibleLayers.sort((a, b) => a.frame.y - b.frame.y);
    
    let isColumn = visibleLayers.every((layer, i) => i === 0 || visibleLayers[i - 1].frame.y + visibleLayers[i - 1].frame.height <= visibleLayers[i].frame.y);
    if (isColumn) {
      visibleLayers.forEach((layer, i) => {
        let style = styles[layer['do_objectID']];
        Object.assign(style, {
          position: 'relative',
          left: undefined,
          top: undefined,
        });
        let leftGap = layer.frame.x - innerFrame.x;
        let rightGap = innerFrame.x + innerFrame.width - layer.frame.x - layer.frame.width;
        if (leftGap === rightGap) {
          if (leftGap !== 0) {
            Object.assign(style, {
              marginLeft: 'auto',
              marginHeight: 'auto',
            });
          } else {
            Object.assign(style, {
              width: undefined,
            });
          }
        } else {
          if (leftGap) {
            Object.assign(style, {
              marginLeft: leftGap,
            });
          }
        }
        if (i >= 1) {
          let topGap = layer.frame.y - visibleLayers[i - 1].frame.y - visibleLayers[i - 1].frame.height;
          Object.assign(style, {
            marginTop: topGap ? topGap : undefined,
          });
        }
      });
      return {styles};
    }
    
    // TODO: row layout
    // TODO: grid layout
    return {styles};
  }
}
export class Artboard extends Group {
  static _class = 'artboard';
}
export class SymbolMaster extends Artboard {
  static _class = 'symbolMaster';
}
function f2i(f) {
  return Math.round(f * 255) || 0;
}

function f2x(f) {
  let s = (Math.round(f * 255) || 0).toString(16);
  if (s.length === 1) {
    s = '0' + s;
  }
  return s;
}

export class Color {
  static _class = 'color';
  
  toString(context) {
    let opacity = context && 'opacity' in context ? context['opacity'] : 1;
    let alpha = this.alpha === undefined ? 1 : this.alpha;
    if (alpha === 1) {
      return `#${f2x(this.red)}${f2x(this.green)}${f2x(this.blue)}`
    }
    return `rgba(${f2i(this.red)},${f2i(this.green)},${f2i(this.blue)},${alpha * opacity})`
  }
}

export class Gradient {
  static _class = 'gradient';
  
  toString(model) {
    switch (this.gradientType) {
      case 0: // linear-gradient
        let {x: x1, y: y1} = s2p(this.from);
        let {x: x2, y: y2} = s2p(this.to);
        x1 *= model.frame.width;
        x2 *= model.frame.width;
        y1 *= model.frame.height;
        y2 *= model.frame.height;
        let angle = 90 + Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        return `linear-gradient(${angle}deg, ${this.stops.join(', ')})`;
      default:
        return `<Empty>`;
    }
  }
}

export class GradientStop {
  static _class = 'gradientStop';
  
  toString() {
    return `${this.color} ${this.position * 100}%`
  }
}

export class Style {
  static _class = 'style';
  
  toStyle(model = {}, isSvg = false) {
    let ret = {};
    // Lock, ClickThrough
    if (model.isLocked) {
      Object.assign(ret, {pointerEvent: 'none'});
    } else {
      if (!model.hasClickThrough) {
        Object.assign(ret, {pointerEvent: 'auto'});
      }
    }
    // Visible
    if (!model.isVisible) {
      Object.assign(ret, {display: 'none'});
    }
    // Rotation, FlippedHorizontal, FlippedVertical
    if (model.rotation || model.isFlippedHorizontal || model.isFlippedVertical) {
      let transformString = '';
      if (model.rotation) {
        transformString += ` rotate(${-model.rotation}deg)`
      }
      if (model.isFlippedHorizontal || model.isFlippedVertical) {
        let a = model.isFlippedHorizontal ? -1 : 1;
        let d = model.isFlippedVertical ? -1 : 1;
        transformString += ` matrix(${a}, 0, 0, ${d}, 0, 0)`
      }
      Object.assign(ret, {transform: transformString});
    }
    if (this['borders']) { // Only accept first border
      let borders = this['borders'];
      Object.assign(ret, {boxSizing: `border-box`});
      let border = borders.filter(border => border['isEnabled']).reverse()[0];
      if (border) {
        Object.assign(ret, border.toStyle(isSvg));
      }
    }
    let hasContextStyle = false;
    if (this['contextSettings']) {
      let {opacity, blendMode} = this['contextSettings'];
      if (opacity !== 1) {
        hasContextStyle = true;
        Object.assign(ret, {opacity: this['contextSettings'].opacity});
      }
      if (blendMode !== BlendingMode.Normal) {
        hasContextStyle = true;
        Object.assign(ret, {mixBlendMode: getBlendModeString(this['contextSettings'].blendMode)});
      }
    }
    // Complex shape
    if (isSvg) {
      Object.assign(ret, {fillRule: 'evenodd', fill: 'none'});
      if (this['fills']) {
        let fills = this['fills'].filter(fill => fill['isEnabled']).reverse();
        if (fills.length) {
          Object.assign(ret, {fill: fills[0].color.toString()});
        }
      }
      return ret;
    }
    // Simple shape
    if (model instanceof ShapeGroup && model.isSimple()) {
      if (model.layers[0] instanceof Oval) {
        Object.assign(ret, {borderRadius: '50%'});
      }
      if (model.layers[0] instanceof Rectangle) {
        let path = model.layers[0].path;
        Object.assign(ret, {borderRadius: `${[0, 2, 1, 3].map(i => path.points[0]['cornerRadius'] + 'px').join(' ')}`});
      }
    }
    // Shadow, innerShadow
    let shadowList = [];
    if (this['shadows']) {
      shadowList = shadowList.concat(this['shadows'].filter(shadow => shadow['isEnabled']));
    }
    if (this['innerShadows']) {
      shadowList = shadowList.concat(this['innerShadows'].filter(shadow => shadow['isEnabled']));
    }
    if (shadowList.length) {
      Object.assign(ret, {boxShadow: shadowList.map(s => s.toString()).join(', ')});
    }
    // Fills (simple)
    if (model instanceof ShapeGroup && !hasContextStyle && this['fills']) {
      let fills = this['fills'].filter(fill => fill['isEnabled']);
      if (fills.length && fills.every(fill => fill.blendMode === getBlendModeString(BlendingMode.Normal))) {
        Object.assign(ret, {background: fills.map(fill => fill.toString(model)).join(', ')})
      }
    }
    return ret;
  }
}
function getBlendModeString(blendMode) {
  for (let mode in BlendingMode) {
    if (BlendingMode[mode] === blendMode) {
      return kebabCase(mode);
    }
  }
  return '';
}
export class GraphicsContextSettings {
  static _class = 'graphicsContextSettings';
}
export class Fill {
  static _class = 'fill';
  
  get blendMode() {
    let context = this['contextSettings'];
    if (!context) {
      context = {blendMode: BlendingMode.Normal};
    }
    return getBlendModeString(context.blendMode);
  }
  
  toString(model) {
    switch (this.fillType) {
      case FillType.Solid: // flat color
        let c = this.color.toString();
        return `linear-gradient(0deg, ${c},${c})`;
      case FillType.Gradient:// gradient
        return this.gradient.toString(model);
      default:
        return '';
    }
  }
  
  toStyle(model) {
    switch (this.fillType) {
      case FillType.Solid: // flat color
        return {background: this.color.toString(), mixBlendMode: this.blendMode};
      case FillType.Gradient:// gradient
        return {background: this.gradient.toString(model), mixBlendMode: this.blendMode};
      default:
        return {};
    }
  }
}

export class Shadow {
  static _class = 'shadow';
  
  toString() {
    return `${this.offsetX}px ${this.offsetY}px ${this.blurRadius}px ${this.spread}px ${this.color}`
  }
}
export class InnerShadow extends Shadow {
  static _class = 'innerShadow';
  
  toString() {
    return `inset ${super.toString()}`;
  }
}
export class Border {
  static _class = 'border';
  
  toString() {
    let {color, thickness, fillType} = this;
    return `${thickness}px solid ${color}`;
  }
  
  toStyle(isSvg = false) {
    if (!isSvg) {
      return {border: this.toString()};
    } else {
      let {color, thickness, fillType} = this;
      return {stroke: color, strokeWidth: thickness}
    }
  }
}


export class SymbolInstance {
  static _class = 'symbolInstance';
}
export class Document {
  static _class = 'document';
}

export class MSJSONFileReference {
  static _class = 'MSJSONFileReference';
  
  constructor(zip, parse) {
    this.zip = zip;
    this.parse = parse;
  }
  
  async getInstance() {
    
    switch (this['_ref_class']) {
      case "MSImmutablePage":
        let json = await this.zip.file(this['_ref'] + '.json')
          .async('string');
        return this.parse(JSON.parse(json), this.zip);
      case "MSImageData":
        let buffer = await this.zip.file(this['_ref'] + '.png')
          .async('nodebuffer');
        let blob = new Blob([buffer], {type: 'image/png'});
        return URL.createObjectURL(blob);
    }
  }
}
const Alignment = {
  Left: 4,
  Center: 2,
  Right: 1,
  Justify: 3,
};
const AlignmentString = {
  4: 'left',
  2: 'center',
  1: 'right',
  3: 'justify',
};
export class TextStyle {
  static _class = 'textStyle';
  
  toStyle(model) {
    let style = {};
    // window.model = model;
    // if(model.attributedString.archivedAttributedString.NSAttributes instanceof Array){
    // debugger;
    // }
    if (this.encodedAttributes.NSParagraphStyle.NSAlignment !== Alignment.Left) {
      Object.assign(style, {textAlign: AlignmentString[this.encodedAttributes.NSParagraphStyle.NSAlignment]});
    }
    if (model.textBehaviour) {
      Object.assign(style, {width: model.frame.width});
    } else {
      Object.assign(style, {whiteSpace: 'nowrap'});
    }
    return {
      fontSize: this.encodedAttributes.MSAttributedStringFontAttribute.NSFontDescriptorAttributes.NSFontSizeAttribute,
      color: Color.prototype.toString.call(this.encodedAttributes.NSColor),
      ...style,
    };
  }
  
}
export class Bitmap {
  static _class = 'bitmap';
}
function toS(a){
  return a.toPrecision(6).replace(/\.?0+$/,'');
}
export class ShapePath {
  static _class = 'shapePath';
  
  getXY(s) {
    let {x, y} = s2p(s);
    x = this.frame._x + this.frame._width * x;
    y = this.frame._y + this.frame._height * y;
    return {x, y}
  }
  
  toD() {
    let path = this.path;
    let {x, y} = this.getXY(path.points[0].point);
    let ret = `M${toS(x)},${toS(y)}`;
    let n = path['isClosed'] ? path.points.length + 1 : path.points.length;
    for (let i = 1; i < n; ++i) {
      let now = i;
      if (now === path.points.length) {
        now = 0;
      }
      let prev = (i - 1);
      let {x: x1, y: y1} = this.getXY(path.points[prev].curveFrom);
      let {x: x2, y: y2} = this.getXY(path.points[now].curveTo);
      let {x, y} = this.getXY(path.points[now].point);
      if (!path.points[now].hasCurveTo && !path.points[now].hasCurveFrom){
        ret += `L${toS(x)},${toS(y)}`;
      }else {
        ret += `C${toS(x1)},${toS(y1)} ${toS(x2)},${toS(y2)} ${toS(x)},${toS(y)}`;
      }
    }
    
    if (path['isClosed']) {
      ret += 'Z';
    }
    return ret;
  }
}
export class Rectangle extends ShapePath {
  static _class = 'rectangle';
}
export class Oval extends ShapePath {
  static _class = 'oval';
}
export class Star extends ShapePath {
  static _class = 'star';
}
export class Polygon extends ShapePath {
  static _class = 'polygon';
}
export class Triangle extends ShapePath {
  static _class = 'triangle';
}
export class Path {
  static _class = 'path';
  
}
function s2p(s) {
  let [x, y] = s.substr(1, s.length - 2).split(',').map(Number);
  return {x, y}
}
export class CurvePoint {
  static _class = 'curvePoint';
  
}
export class Text {
  static _class = 'text';
  
}
export class MSAttributedString {
  static _class = "MSAttributedString";
//
//   set archivedAttributedString({_archive}) {
//     Object.assign(this, parseBase64(_archive));
//   }
}