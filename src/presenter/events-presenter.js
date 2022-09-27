import { render } from '../framework/render.js';
import ViewTripEventsList from '../view/view-trip-events-list-create.js';
import ViewNoEvents from '../view/view-no-events.js';
import ViewSort from '../view/view-sort.js';
import { SortType, SORT_TYPE_DEFAULT } from '../mock/sort.js';
import { sortByDay, sortByPrice } from '../utils/point.js';
import PointPresenter from './point-presenter.js';
import { UserAction, UpdateType } from '../mock/actions.js';
export default class EventsPresenter {
  #presenterContainer;
  #model;
  #noEventsView = new ViewNoEvents();
  #eventsView = new ViewTripEventsList();
  #sortView = new ViewSort();
  #pointPresenters = new Map();
  #currentSortType = SORT_TYPE_DEFAULT;
  constructor(presenterContainer, model) {
    this.#presenterContainer = presenterContainer;
    this.#model = model;
    this.#model.addObserver(this.#handleModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.DAY:
        return [...this.#model.points].sort(sortByDay);
      case SortType.PRICE:
        return [...this.#model.points].sort(sortByPrice);
    }
    return this.#model.points;
  }

  init = () => {
    if (this.points.length === 0) {
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
    this.#renderPoints(this.points);
  };

  #clearEventsList = () => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
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
    const pointPresenter = new PointPresenter(this.#eventsView.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_TASK:
        this.#model.updateTask(updateType, update);
        break;
      case UserAction.ADD_TASK:
        this.#model.addTask(updateType, update);
        break;
      case UserAction.DELETE_TASK:
        this.#model.deleteTask(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    console.log(updateType, data);
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда добавлена задача)
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearEventsList();
    this.#renderEventsList();
  };
}
