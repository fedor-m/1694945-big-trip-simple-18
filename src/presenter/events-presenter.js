import { render } from '../framework/render.js';
import ViewTripEventsList from '../view/view-trip-events-list-create.js';
import ViewNoEvents from '../view/view-no-events.js';
import SortTypesModel from '../model/sort-types-model.js';
import { SORT_TYPES } from '../mock/sort.js';
import SortPresenter from './sort-presenter.js';
import PointPresenter from './point-presenter.js';
import { updateItem } from '../utils.js';

export default class EventsPresenter {
  #presenterContainer;
  #model;
  #eventsList = new ViewTripEventsList();
  #pointPresenters = new Map();
  #points = [];
  constructor(presenterContainer, model) {
    this.#presenterContainer = presenterContainer;
    this.#model = model;
  }

  init = () => {
    this.#points = this.#model.points;
    if (this.#points.length === 0) {
      this.#renderNoEvents();
      return;
    }
    this.#renderEventsList();
    this.#renderSortTypes();
    this.#renderPoints(this.#points);
  };

  #renderNoEvents = () => {
    render(new ViewNoEvents(), this.#presenterContainer);
  };

  #renderEventsList = () => {
    render(this.#eventsList, this.#presenterContainer);
  };

  #renderSortTypes = () => {
    const sortTypesModel = new SortTypesModel(SORT_TYPES);
    const sortPresenter = new SortPresenter(this.#eventsList.element, sortTypesModel);
    sortPresenter.init();
  };

  #renderPoints = (points) => {
    for (const point of points) {
      this.#renderPoint(point);
    }
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#eventsList.element, this.#handlePointChange, this.#handleModeChange);
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
