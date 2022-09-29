import { render, remove, RenderPosition } from '../framework/render.js';
import ViewTripEventsList from '../view/view-trip-events-list.js';
import ViewNoEvents from '../view/view-no-events.js';
import ViewSort from '../view/view-sort.js';
import { SortType, SORT_TYPE_DEFAULT } from '../const/sort.js';
import { filter, sortByDay, sortByPrice } from '../utils/point.js';
import PointPresenter from './point-presenter.js';
import NewPointPresenter from './new-point-presenter.js';
import { UserAction, UpdateType } from '../const/actions.js';
import { FILTER_TYPE_DEFAULT } from '../const/filters.js';
export default class EventsPresenter {
  #presenterContainer;
  #pointsModel = null;
  #filtersModel = null;
  #noEventsView = null;
  #eventsListView = new ViewTripEventsList();
  #sortView = null;
  #pointPresenters = new Map();
  #newPointPresenter = null;
  #newPoint = null;
  #currentSortType = SORT_TYPE_DEFAULT;
  constructor(presenterContainer, pointsModel, filtersModel) {
    this.#presenterContainer = presenterContainer;
    this.#pointsModel = pointsModel;
    this.#filtersModel = filtersModel;
    this.#newPoint = pointsModel.localPoint;
    this.#newPointPresenter = new NewPointPresenter(this.#eventsListView.element, this.#handleViewAction);
    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get points() {
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.currentFilter](points);
    switch (this.#currentSortType) {
      case SortType.DAY:
        return filteredPoints.sort(sortByDay);
      case SortType.PRICE:
        return filteredPoints.sort(sortByPrice);
    }
    return filteredPoints;
  }

  get currentFilter () {
    return this.#filtersModel.currentFilter;
  }

  init = () => {
    this.#renderEventsList();
  };

  #renderNoEvents = () => {
    this.#noEventsView = new ViewNoEvents(this.currentFilter);
    render(this.#noEventsView, this.#presenterContainer);
  };

  #renderEventsList = () => {
    const addNewEventButton = document.querySelector('.trip-main__event-add-btn');
    const handleNewEventFormClose = () => {
      addNewEventButton.disabled = false;
    };
    const handleNewEventButtonClick = () => {
      this.#createNewEvent(handleNewEventFormClose, this.#newPoint);
      addNewEventButton.disabled = true;
    };
    this.#eventsListView.setCreateNewEventHandler(handleNewEventButtonClick);
    render(this.#eventsListView, this.#presenterContainer);
    if (this.points.length === 0) {
      this.#renderNoEvents();
      return;
    }
    this.#renderSortTypes();
    this.#renderPoints(this.points);
  };

  #createNewEvent = (callback, point) => {
    this.#currentSortType = SORT_TYPE_DEFAULT;
    this.#filtersModel.setFilter(UpdateType.MAJOR, FILTER_TYPE_DEFAULT);
    this.#newPointPresenter.init(callback, point);
  };

  #renderSortTypes = () => {
    this.#sortView = new ViewSort(this.#currentSortType);
    this.#sortView.setSortTypeChangeHandler(this.#handleSortTypeChange);
    render(this.#sortView, this.#presenterContainer, RenderPosition.AFTERBEGIN);
  };

  #renderPoints = (points) => {
    for (const point of points) {
      this.#renderPoint(point);
    }
  };

  #renderPoint = (point) => {
    const pointPresenter = new PointPresenter(this.#eventsListView.element, this.#handleViewAction, this.#handleModeChange);
    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  };

  #handleModeChange = () => {
    this.#newPointPresenter.destroy();
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this.#pointsModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this.#pointsModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this.#pointsModel.deletePoint(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
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
      this.#currentSortType = SORT_TYPE_DEFAULT;
    }
  };
}
