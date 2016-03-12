import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
const expect = chai.expect;
chai.use(sinonChai);

import { Rectangle } from '../../../src/components/Rectangle';

describe('Rectangle', () => {
  describe('constructor', () => {
    it('initializes the Rectangle with the correct properties', () => {
      const rect = new Rectangle(1, 2, 3, 4);
      expect(rect).to.have.property('_x').that.equals(1);
      expect(rect).to.have.property('_y').that.equals(2);
      expect(rect).to.have.property('_width').that.equals(3);
      expect(rect).to.have.property('_height').that.equals(4);
    });
  });
  describe('inflate', () => {
    it('offsets the size and position of the Rectangle to remain centered on its x and y', () => {
      const rect = new Rectangle(10, 10, 10, 20);
      rect.inflate(10);
      expect(rect.x).to.equal(5);
      expect(rect.y).to.equal(5);
      expect(rect.width).to.equal(20);
      expect(rect.height).to.equal(30);
    });
  });
  describe('subdivide', () => {
    it('subdivides this Rectangle into four smaller equally sized Rectangles', () => {
      const rect = new Rectangle(0, 0, 100, 100);
      const quarters = rect.subdivide();
      expect(quarters).to.be.an.instanceOf(Array).that.has.lengthOf(4);
      function validate(r, x, y, w, h) {
        expect(r).to.be.an.instanceOf(Rectangle);
        expect(r.x).to.equal(x);
        expect(r.y).to.equal(y);
        expect(r.width).to.equal(w);
        expect(r.height).to.equal(h);
      }
      // top left quarter
      validate(quarters[0], 0, 0, 50, 50);
      // top right quarter
      validate(quarters[1], 50, 0, 50, 50);
      // bottom left quarter
      validate(quarters[2], 0, 50, 50, 50);
      // bottom right quarter
      validate(quarters[3], 50, 50, 50, 50);
    });
  });
  describe('copy', () => {
    it('copies the properties of another Rectangle into this Rectangle', () => {
      const rectA = new Rectangle(1, 2, 3, 4);
      const rectB = new Rectangle();
      rectB.copy(rectA);
      expect(rectB.x).to.equal(rectA.x);
      expect(rectB.y).to.equal(rectA.y);
      expect(rectB.width).to.equal(rectA.width);
      expect(rectB.height).to.equal(rectA.height);
    });
  });
  describe('clone', () => {
    it('creates a new Rectangle with the same properties as this Rectangle', () => {
      const rectA = new Rectangle(1, 2, 3, 4);
      const rectB = rectA.clone();
      expect(rectB.x).to.equal(rectA.x);
      expect(rectB.y).to.equal(rectA.y);
      expect(rectB.width).to.equal(rectA.width);
      expect(rectB.height).to.equal(rectA.height);
      rectA.inflate(1000);
      expect(rectB.x).not.to.equal(rectA.x);
      expect(rectB.y).not.to.equal(rectA.y);
      expect(rectB.width).not.to.equal(rectA.width);
      expect(rectB.height).not.to.equal(rectA.height);
    });
  });
  describe('toString', () => {
    it('describes the Rectangle in a human readable format', () => {
      const rect = new Rectangle(1, 2, 3, 4);
      const description = rect.toString();
      expect(description).to.equal('Rectangle [x=1, y=2, width=3, height=4, area=12sq]');
    });
  });
  describe('toXML', () => {
    it('describes the Rectangle in XML format', () => {
      const rect = new Rectangle(1, 2, 3, 4);
      const description = rect.toXML();
      expect(description).to.equal('<rect x="1" y="2" width="3" height="4" area="12" />');
    });
  });
  it('exposes all important properties as read-only', () => {
    const rect = new Rectangle(1, 2, 3, 4);
    expect(rect).to.have.property('x').that.equals(1);
    expect(rect).to.have.property('y').that.equals(2);
    expect(rect).to.have.property('width').that.equals(3);
    expect(rect).to.have.property('height').that.equals(4);
    expect(rect).to.have.property('area').that.equals(12);
    const xSet = () => { rect.x = 0; };
    const ySet = () => { rect.y = 0; };
    const widthSet = () => { rect.width = 0; };
    const heightSet = () => { rect.height = 0; };
    const areaSet = () => { rect.area = 0; };
    expect(xSet).to.throw(Error);
    expect(ySet).to.throw(Error);
    expect(widthSet).to.throw(Error);
    expect(heightSet).to.throw(Error);
    expect(areaSet).to.throw(Error);
  });
});
