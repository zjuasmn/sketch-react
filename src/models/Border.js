export default class Border {
  toString() {
    return ``
  }
  
  toStyle() {
    return this.isEnabled ?
      {
        borderColor: this.color.toString(),
        borderWidth: this.thickness,
        borderStyle: this.fillType === 0 ? 'solid' : 'dotted',
      } : {};
  }
}