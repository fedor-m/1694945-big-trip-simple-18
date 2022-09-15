import { render } from '../framework/render.js';
import ViewTripEventsList from '../view/view-trip-events-list-create.js';
import { generateDestination } from '../mock/destinations.js';
import { generateOffersByType } from '../mock/offers.js';
import ViewNoEvents from '../view/view-no-events.js';
import SortTypesModel from '../model/sort-types-model.js';
import { SORT_TYPES } from '../mock/sort.js';
import SortPresenter from './sort-presenter.js';
import PointPresenter from './point-presenter.js';

export default class EventsPresenter {
  #presenterContainer;
  #model;
  #eventsList = new ViewTripEventsList();
  constructor(presenterContainer, model) {
    this.#presenterContainer = presenterContainer;
    this.#model = model;
  }

  init = () => {
    const points = this.#model.points;
    if (points.length === 0) {
      render(new ViewNoEvents(), this.#presenterContainer);
      return;
    }
    render(this.#eventsList, this.#presenterContainer);
    const sortTypesModel = new SortTypesModel(SORT_TYPES);
    const sortPresenter = new SortPresenter(this.#eventsList.element, sortTypesModel);
    sortPresenter.init();
    for (const point of points) {
      const destination = generateDestination(point.destination);
      const offers = generateOffersByType(point.type, point.offers);
      this.#renderPoint(point, destination, offers);
    }
  };

  #renderPoint = (point, destination, offers) => {
    const eventPresenter = new PointPresenter(this.#eventsList.element);
    eventPresenter.init(point, destination, offers);
  };
}
