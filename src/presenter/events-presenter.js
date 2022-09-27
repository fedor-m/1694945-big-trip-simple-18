import { render, remove } from '../framework/render.js';
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
  #sortView = null;
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
    this.#renderEventsList();
  };

  #renderNoEvents = () => {
    render(this.#noEventsView, this.#presenterContainer);
  };

  #renderEventsList = () => {
    this.#renderSortTypes();
    render(this.#eventsView, this.#presenterContainer);
    if (this.points.length === 0) {
      this.#renderNoEvents();
      return;
    }
    this.#renderPoints(this.points);
  };

  #renderSortTypes = () => {
    this.#sortView = new ViewSort(this.#currentSortType);
    this.#sortView.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortView, this.#presenterContainer);
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
    console.log(actionType, updateType, update);
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
        this.#pointPresenters.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearEventsList();
        this.#renderEventsList();
        break;
      case UpdateType.MAJOR:
        this.#clearEventsList({resetRenderedPointCount: true, resetSortType: true});
        this.#renderEventsList();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }
    this.#currentSortType = sortType;
    this.#clearEventsList({resetRenderedPointCount: true});
    this.#renderEventsList();
  };

  #clearEventsList = ({resetSortType = false} = {}) => {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
    remove(this.#sortView);
    remove(this.#noEventsView);
    if (resetSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };
}
