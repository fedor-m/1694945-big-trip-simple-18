import Observable from '../framework/observable.js';
import { getRandomInteger } from '../utils/common.js';
import { generatePoint } from '../mock/point.js';
import { generateLocalPoint } from '../mock/local-point.js';
import { sortByDay } from '../utils/point.js';
const MIN_POINTS = 0;
const MAX_POINTS = 10;
const tripPointsCount = getRandomInteger(MIN_POINTS, MAX_POINTS);
export default class PointsModel extends Observable {
  #pointsApiService = null;
  #points = Array.from({ length: tripPointsCount }, generatePoint).sort(
    sortByDay,
  );

  #localPoint = generateLocalPoint();

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;
    this.#pointsApiService.points.then((points) => {
      console.log(points.map(this.#adaptToClient));
    });
  }

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
    this.#points = [update, ...this.#points];
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

  #adaptToClient = (point) => {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite'],
    };
    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];
    return adaptedPoint;
  };
}
