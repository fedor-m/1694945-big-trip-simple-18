import Observable from '../framework/observable.js';
import { getRandomInteger } from '../utils/common.js';
import { generatePoint } from '../mock/point.js';
const MIN_POINTS = 0;
const MAX_POINTS = 10;
const tripPointsCount = getRandomInteger(MIN_POINTS, MAX_POINTS);
export default class PointsModel extends Observable {

  get points() {
    return Array.from({ length: tripPointsCount }, generatePoint);
  }

  get localPoint() {
    return generatePoint();
  }
}
