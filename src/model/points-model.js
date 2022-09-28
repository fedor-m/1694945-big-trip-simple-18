import Observable from '../framework/observable.js';
import { getRandomInteger } from '../utils/common.js';
import { generatePoint } from '../mock/point.js';
import { sortByDay } from '../utils/point.js';
const MIN_POINTS = 0;
const MAX_POINTS = 10;
const tripPointsCount = getRandomInteger(MIN_POINTS, MAX_POINTS);
export default class PointsModel extends Observable {
  #points = Array.from({ length: tripPointsCount }, generatePoint).sort(sortByDay);
  #localPoint = generatePoint();

  get points() {
    return this.#points;
  }

  get localPoint() {
    return this.#localPoint;
  }

  updatePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  };

  addPoint = (updateType, update) => {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  };

  deletePoint = (updateType, update) => {
    const index = this.#points.findIndex((point) => point.id === update.id);
    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  };
}
