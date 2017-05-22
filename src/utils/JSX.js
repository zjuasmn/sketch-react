import camelCase from 'lodash/camelCase'

export function cssText2obj(cssText) {
  let ret = {};
  cssText.split(';')
    .map(s => s.trim())
    .filter(s => s.length > 0)
    .forEach(s => {
      let [prop, value] = s.split(':').map(s => s.trim());
      ret[camelCase(prop)] = value;
    });
  return ret;
}

export function cssText2jsxCode(cssText) {
  return `{${Object.entries(cssText2obj(cssText)).map(([prop, value]) => `${prop}: '${value}'`).join(', ')}}`;
}

export function getFormattedJSXCode(o, depth = 0) {
  let spaces = '';
  for (let i = 0; i < depth; ++i) {
    spaces += '  ';
  }
  let tagName = o.tagName.toLowerCase();
  switch (tagName) {
    case 'img':
      return `${spaces}<img src='${o.getAttribute('src')}' style={${cssText2jsxCode(o.style.cssText)}}/>\n`;
    case 'path':
      return `${spaces}<path d='${o.getAttribute('d')}'/>\n`;
    case 'span':
      return `${spaces}<span style={${cssText2jsxCode(o.style.cssText)}}>${o.innerText}</span>\n`;
    default:
      if (o.childNodes.length === 0) {
        return `${spaces}<${tagName} style={${cssText2jsxCode(o.style.cssText)}}/>\n`;
      }
      return `${spaces}<${tagName} style={${cssText2jsxCode(o.style.cssText)}}>\n${Array.prototype.map.call(o.childNodes, child => getFormattedJSXCode(child, depth + 1)).join('')}${spaces}</${tagName}>\n`
  }
}

export function getReactCode(o) {
  return `import React from 'react'

export default class MyComp extends React.Component {
  render(){
    return (
${getFormattedJSXCode(o, 3, true)}    );
  }
}`
}