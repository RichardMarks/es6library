/**
 * an object which represents a rectangle
 */
export class Rectangle {
  /**
   * @param {?number} x - horizontal position of the left side of the rectangle
   * @param {?number} y - vertical position of the top of the rectangle
   * @param {?number} width - width of the rectangle
   * @param {?number} height - height of the rectangle
   */
  constructor(x, y, width, height) {
    this._x = x;
    this._y = y;
    this._width = width;
    this._height = height;
  }

  /**
   * horizontal position of the left side of the rectangle
   * @type {number}
   */
  get x() { return this._x; }

  /**
   * vertical position of the top of the rectangle
   * @type {number}
   */
  get y() { return this._y; }

  /**
   * width of the rectangle
   * @type {number}
   */
  get width() { return this._width; }

  /**
   * height of the rectangle
   * @type {number}
   */
  get height() { return this._height; }

  /**
   * area of the rectangle (width * height) in square units
   * @type {number}
   */
  get area() { return this._width * this._height; }

  /**
   * inflate the size of the rectangle by given distance while remaining centered in place
   * @param {!number} distance - distance to inflate the rectangle
   * @returns {!Rectangle} this Rectangle instance for chaining method calls
   */
  inflate(distance) {
    const halfDist = (distance * 0.5) | 0;
    this._x -= halfDist;
    this._y -= halfDist;
    this._width += distance;
    this._height += distance;
    return this;
  }

  /**
   * subdivides this rectangle into four equally sized quarters
   * @returns {Array<Rectangle>} four quarters of this Rectangle
   */
  subdivide() {
    const top = this._y;
    const left = this._x;
    const right = left + this._width;
    const bottom = top + this._height;
    const width = (this._width * 0.5) | 0;
    const height = (this._height * 0.5) | 0;
    return [
      new Rectangle(left, top, width, height),
      new Rectangle(width, top, width, height),
      new Rectangle(left, height, width, height),
      new Rectangle(width, height, width, height),
    ];
  }

  /**
   * copies the properties of another Rectangle into this Rectangle
   * @param {!Rectangle} other - Rectangle to copy of the properties from
   * @returns {!Rectangle} this Rectangle instance for chaining method calls
   */
  copy(other) {
    this._x = other.x;
    this._y = other.y;
    this._width = other.width;
    this._height = other.height;
    return this;
  }

  /**
   * creates a clone of this Rectangle
   * @returns {!Rectangle} the cloned Rectangle instance
   */
  clone() {
    const rect = new Rectangle();
    rect.copy(this);
    return rect;
  }

  /**
   * describes this Rectangle in a human readable formatted string
   * @returns {!string} a human readable description of this Rectangle
   */
  toString() {
    const { x, y, width, height, area } = this;
    return `Rectangle [x=${x}, y=${y}, width=${width}, height=${height}, area=${area}sq]`;
  }

  /**
   * describes this Rectangle in an XML format suitable for passing data to other software
   * @returns {!string} this Rectangle in an XML formatted string
   */
  toXML() {
    const { x, y, width, height, area } = this;
    const openTag = '<rect ';
    const closeTag ='/>';
    const attr = (k, v) => `${k}="${v}" `;
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
