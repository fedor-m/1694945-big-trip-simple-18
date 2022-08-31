import { render } from '../render.js';
import ViewTripEventsList from '../view/view-trip-events-list-create.js';
import ViewFormEdit from '../view/view-form-edit.js';
import { generateDestination } from '../mock/destinations.js';
import { generateOffersByType } from '../mock/offers.js';
import ViewTripPoint from '../view/view-trip-point.js';
import ViewFormCreate from '../view/view-form-create.js';

export default class EventsPresenter {
  constructor(presenterContainer, model) {
    this.presenterContainer = presenterContainer;
    this.model = model;
  }

  init() {
    const eventsList = new ViewTripEventsList();
    const points = this.model.points;
    const localPointModel = this.model.localPoint;
    const localPoint = {
      model: localPointModel,
      destination: generateDestination(localPointModel.destination),
      offers: generateOffersByType(
        localPointModel.type,
        localPointModel.offers,
      ),
    };
    render(eventsList, this.presenterContainer);
    render(
      new ViewFormEdit(
        localPoint.model,
        localPoint.destination,
        localPoint.offers,
      ),
      eventsList.element,
    );
    for (const point of points) {
      const destination = generateDestination(point.destination);
      const offers = generateOffersByType(point.type, point.offers);
      render(
        new ViewTripPoint(point, destination, offers),
        eventsList.element,
      );
    }
    render(
      new ViewFormCreate(
        localPoint.model,
        localPoint.destination,
        localPoint.offers,
      ),
      eventsList.element,
    );
  }
}
