import { generatePoint } from '../mock/point.js';
import { generateLocalPoint } from '../mock/local-point.js';

const TRIP_POINTS_COUNT = 3;
export default class Model {
  #points = Array.from({length: TRIP_POINTS_COUNT}, generatePoint);
  #localPoint = generateLocalPoint();
  get points() { return this.#points;}
  get localPoint() { return this.#localPoint; }
}
