export default class Style {
  toStyle() {
    let ret = {};
    if ('borders' in this) {
      ret = {...ret, ...this.borders[0].toStyle()};
    }
  }
}