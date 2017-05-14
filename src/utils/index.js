import * as models from '../models/index'
class Dummy {
  constructor(json) {
    setProps(this, json);
  }
  
  toString() {
    return JSON.stringify(this.json);
  }
}
let mapping = {};
for (let modelName in models) {
  let model = models[modelName];
  mapping[model._class] = model;
}

function isClass(o) {
  return o && typeof o === 'object' && '_class' in o && typeof o['_class'] === 'string'
}
function isPlistArchive(o) {
  return o && typeof o === 'object' && '_archive' in o;
}
import {parseBase64} from './bplist-parser'
let objectMapping = {};
export function clear() {
  objectMapping = {};
}
export function getObjectById(id) {
  return objectMapping[id];
}
export function parse(json, zip) {
  
  if (isClass(json)) {
    let className = json['_class'];
    if (className in mapping) {
      let ret = new mapping[className](zip, parse);
      setProps(ret, json, zip);
      if (className === 'symbolMaster') {
        console.log(json['symbolID']);
        objectMapping[json['symbolID']] = ret;
      }
      return ret;
    } else {
      return json;
    }
  } else if (isPlistArchive(json)) {
    return parseBase64(json['_archive']);
  } else if (typeof json === 'object') {
    for (let prop in json) {
      json[prop] = parse(json[prop], zip);
    }
    return json;
  }
  else if (json instanceof Array) {
    return json.map(o => parse(o, zip));
  } else {
    return json;
  }
}
export function setProps(obj, json, zip) {
  for (let prop in json) {
    obj[prop] = parse(json[prop], zip);
  }
}

