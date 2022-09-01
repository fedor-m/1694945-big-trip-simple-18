import { generatePoint } from '../mock/point.js';
import { generateLocalPoint } from '../mock/local-point.js';
export default class PointsModel {
  #length = null;
  constructor(length) {
    this.#length = length;
  }

  get points() {
    return Array.from({ length: this.#length }, generatePoint);
  }

  get localPoint() {
    return generateLocalPoint();
  }
}
