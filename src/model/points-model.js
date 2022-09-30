import Observable from '../framework/observable.js';
import { UpdateType } from '../const/actions.js';
export default class PointsModel extends Observable {
  #points = [];
  #pointsApiService = null;
  #offers = [];
  #destinations = [];

  constructor(pointsApiService) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  init = async () => {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
      this.#destinations = await this.#pointsApiService.destinations;
      this.#offers = await this.#pointsApiService.offers;
    } catch (err) {
      this.#points = [];
      this.#destinations = [];
      this.#offers = [];
    }
    this._notify(UpdateType.INIT);
  };

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
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
