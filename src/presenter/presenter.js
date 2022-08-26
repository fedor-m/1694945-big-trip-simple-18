import { render } from '../render.js';
import ViewTripEventsList from '../view/view-trip-events-list-create.js';
import ViewFormEdit from '../view/view-form-edit.js';
import { generateDestination } from '../mock/destinations.js';
import { generateOffers } from '../mock/offers.js';
import ViewTripPoint from '../view/view-trip-point.js';
import ViewFormCreate from '../view/view-form-create.js';


export default class Presenter {
  constructor(presenterContainer, model) {
    this.presenterContainer = presenterContainer;
    this.model = model;
  }

  init() {
    const eventsList = new ViewTripEventsList();
    const points = this.model.points;
    const localPoint = {
      model: this.model.localPoint,
      destination: generateDestination(this.model.localPoint.destination),
      offers: [],
    };
    render(eventsList, this.presenterContainer);
    for (const offer of this.model.localPoint.offers)
    {
      localPoint.offers.push(generateOffers(localPoint.type).offers.find((o)=>o.id === offer));
    }
    render(new ViewFormEdit(localPoint.model, localPoint.destination, localPoint.offers), eventsList.getElement());
    for (const point of points) {
      const destination = generateDestination(point.destination);
      const offersList = generateOffers(point.type);
      const offers = [];
      for (const offer of point.offers)
      {
        offers.push((offersList.offers.find((o)=>o.id === offer)));
      }
      render(new ViewTripPoint(point, destination, offers), eventsList.getElement());
    }
    render(new ViewFormCreate(localPoint.model, localPoint.destination, localPoint.offers), eventsList.getElement());
  }
}
