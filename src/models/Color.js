
function f2i(f) {
  return Math.round(f * 255) || 0;
}
export default class Color {
  toString() {
    return `rgba(${f2i(this.red)},${f2i(this.green)},${f2i(this.blue)},${this.alpha})`
  }
}