import { render } from '../framework/render.js';
import ViewTripEventsList from '../view/view-trip-events-list-create.js';
import ViewNoEvents from '../view/view-no-events.js';
import ViewSort from '../view/view-sort.js';
import { SortTypeEnabled, SORT_TYPE_DEFAULT } from '../mock/sort.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils/common.js';
import { sortByDay, sortByPrice } from '../utils/point.js';

export default class EventsPresenter {
  #presenterContainer;
  #model;
  #noEventsView = new ViewNoEvents();
  #eventsView = new ViewTripEventsList();
  #sortView = new ViewSort();
  #pointPresenters = new Map();
  #points = [];
  #defaultPoints = [];
  #currentSortType = SORT_TYPE_DEFAULT;
  constructor(presenterContainer, model) {
    this.#presenterContainer = presenterContainer;
    this.#model = model;
  }

  init = () => {
    this.#points = this.#model.points;
    this.#sortPoints(SORT_TYPE_DEFAULT);
    this.#defaultPoints = this.#points.slice();
    if (this.#points.length === 0) {
      this.#renderNoEvents();
      return;
    }
    this.#renderSortTypes();
    this.#renderEventsList();
  };

  #renderNoEvents = () => {
    render(this.#noEventsView, this.#presenterContainer);
  };

  #renderEventsList = () => {
    render(this.#eventsView, this.#presenterContainer);
    this.#renderPoints(this.#points);
  };

  #clearEventsList = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  };

  #sortPoints = (sortType) => {
    switch (sortType) {
      case SortTypeEnabled.DAY:
        this.#points.sort(sortByDay);
        break;
      case SortTypeEnabled.PRICE:
        this.#points.sort(sortByPrice);
        break;
      default:
        this.#points = this.#defaultPoints.slice();
    }
    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#sortPoints(sortType);
    this.#clearEventsList();
    this.#renderEventsList();
  };

  #renderSortTypes = () => {
    render(this.#sortView, this.#presenterContainer);
    this.#sortView.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderPoints = (points) => {
    for (const point of points) {
      this.#renderPoint(point);
    }
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#eventsView.element, this.#handlePointChange, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #handlePointChange = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };


}
