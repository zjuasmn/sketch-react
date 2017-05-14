import 'babel-polyfill'


export class Page {
  static _class = 'page';
}
export class Artboard {
  static _class = 'artboard';
}
export class Rect {
  static _class = 'rect';
}
export class ShapeGroup {
  static _class = 'shapeGroup';
}
export class Group {
  static _class = 'group';
}

function f2i(f) {
  return Math.round(f * 255) || 0;
}
export class Color {
  static _class = 'color';
  
  toString(context) {
    let opacity = context && 'opacity' in context ? context['opacity'] : 1;
    let alpha = this.alpha === undefined ? 1 : this.alpha;
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
        return `linear-gradient(${angle}deg, ${this.stops.join(', ')})`
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
    let ret = {boxSizing: `border-box`};
    if (!model.isVisible) {
      return {display: 'none'};
    }
    // if (this['fills']) {
    //   let fills = this['fills'].filter(fill => fill['isEnabled']).reverse();
    //   ret = {
    //     ...ret, background: fills.map(fill => fill.toString()).join(', '),
    //     backgroundBlendMode: fills.map(fill => fill.blendMode).join(','),
    //     mixBlendMode: fills.length ? fills[fills.length - 1].blendMode : 'normal',
    //   }
    // }
    if (model instanceof ShapeGroup && model.layers && model.layers.length === 1 && !model.layers[0]['edited']) {
      if (model.layers[0] instanceof Oval && model.frame.width === model.frame.height) {
        Object.assign(ret, {borderRadius: '50%'});
      }
      if (model.layers[0] instanceof Rectangle) {
        let path = model.layers[0].path;
        Object.assign(ret, {borderRadius: `${[0, 2, 1, 3].map(i => path.points[0]['cornerRadius'] + 'px').join(' ')}`});
      }
      
    }
    if (isSvg) {
      if (!this['fills']) {
        Object.assign(ret, {fill: 'none'});
      } else {
        
        let fills = this['fills'].filter(fill => fill['isEnabled']).reverse();
        if (fills.length) {
          Object.assign(ret, {fill: fills[0].color.toString()});
        }
      }
    }
    if (this['borders']) {
      let borders = this['borders'];
      let border = borders.filter(border => border.isEnabled)[0];
      if (border) {
        Object.assign(ret, border.toStyle(isSvg));
      }
    }
    let shadowList = [];
    if (this['shadows']) {
      shadowList = shadowList.concat(this['shadows']);
    }
    if (this['innerShadows']) {
      shadowList = shadowList.concat(this['innerShadows']);
    }
    if (shadowList.length) {
      Object.assign(ret, {boxShadow: shadowList.map(s => s.toString()).join(', ')});
    }
    
    if (model.isLocked) {
      Object.assign(ret, {pointerEvent: 'none'});
    } else {
      if (!model.hasClickThrough) {
        Object.assign(ret, {pointerEvent: 'auto'});
      }
    }
    if (!model.isVisible) {
      Object.assign(ret, {display: 'none'});
    }
    if (model.rotation) {
      Object.assign(ret, {transform: `rotate(${-model.rotation}deg)`});
    }
    if (this['contextSettings']) {
      Object.assign(ret, {opacity: this['contextSettings'].opacity});
    }
    return ret;
  }
}

export class GraphicsContextSettings {
  static _class = 'graphicsContextSettings';
}
import {BlendingMode} from 'sketch-constants'
import _ from 'lodash'
export class Fill {
  static _class = 'fill';
  
  get blendMode() {
    let context = this.contextSettings;
    if (!context) {
      context = {blendMode: 0};
    }
    for (let mode in BlendingMode) {
      if (BlendingMode[mode] === context.blendMode) {
        return _.kebabCase(mode);
      }
    }
    return null;
  }
  
  toString() {
    switch (this.fillType) {
      case 0: // flat color
        let c = this.color.toString();
        return `linear-gradient(0deg, ${c},${c})`;
      case 1:// gradient
        return this.gradient.toString();
      default:
        return '';
    }
  }
  
  toStyle(model) {
    switch (this.fillType) {
      case 0: // flat color
        return {background: this.color.toString(), mixBlendMode: this.blendMode};
      case 1:// gradient
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

export class SymbolMaster {
  static _class = 'symbolMaster';
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

export class TextStyle {
  static _class = 'textStyle';
  
  toStyle(model) {
    // window.model = model;
    // if(model.attributedString.archivedAttributedString.NSAttributes instanceof Array){
    // debugger;
    // }
    return {
      fontSize: this.encodedAttributes.MSAttributedStringFontAttribute.NSFontDescriptorAttributes.NSFontSizeAttribute,
      color: Color.prototype.toString.call(this.encodedAttributes.NSColor),
      width:model.textBehaviour === 1 ? model.frame.width : undefined,
    };
  }
  
}
export class Bitmap {
  static _class = 'bitmap';
}
export class ShapePath {
  static _class = 'shapePath';
  
  getXY(s) {
    let {x, y} = s2p(s);
    x = this.frame.x + this.frame.width * x;
    y = this.frame.y + this.frame.height * y;
    return {x, y}
  }
  
  toD() {
    let path = this.path;
    let {x, y} = this.getXY(path.points[0].point);
    let ret = `M${x},${y}`;
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
      ret += `C${x1},${y1} ${x2},${y2} ${x},${y}`;
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
import {parseBase64} from './../utils/bplist-parser'
export class MSAttributedString {
  static _class = "MSAttributedString";
//
//   set archivedAttributedString({_archive}) {
//     Object.assign(this, parseBase64(_archive));
//   }
}