export class Rectangle {
  constructor(x, y, width, height) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
  }

  get x() { return this._x; }
  get y() { return this._y; }
  get width() { return this._width; }
  get height() { return this._height; }
  get area() { return this._width * this._height; }

  inflate(distance) {
    const halfDist = (distance * 0.5) | 0;
    this._x -= halfDist;
    this._y -= halfDist;
    this._width += distance;
    this._height += distance;
    return this;
  }

  copy(other) {
    this._x = other.x;
    this._y = other.y;
    this._width = other.width;
    this._height = other.height;
    return this;
  }

  clone() {
    const rect = new Rectangle();
    rect.copy(this);
    return rect;
  }

  toString() {
    const { x, y, width, height, area } = this;
    return `Rectangle [x=${x}, y=${y}, width=${width}, height=${height}, area=${area}sq]`;
  }

  toXML() {
    const { x, y, width, height, area } = this;
    const openTag = '<rect ';
    const closeTag ='/>';
    const attr = (k, v) => `${k}="${v} "`;
    const attributes = [
      attr('x', x),
      attr('y', y),
      attr('width', width),
      attr('height', height),
      attr('area', area),
    ].join('');
    return `${openTag}${attributes}${closeTag}`;
  }
}
