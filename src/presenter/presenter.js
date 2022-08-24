import { render } from '../render.js';
import ViewTripEventsList from '../view/view-trip-events-list-create.js';
import ViewFormEdit from '../view/view-form-edit.js';
import ViewTripPoint from '../view/view-trip-point.js';
import ViewFormCreate from '../view/view-form-edit.js';

export default class Presenter {
  constructor(presenterContainer) {
    this.presenterContainer = presenterContainer;
  }

  init() {
    const TRIP_POINTS_COUNT = 3;
    const eventsList = new ViewTripEventsList();
    render(eventsList, this.presenterContainer);
    render(new ViewFormEdit(), eventsList.getElement());
    for (let i = 0; i < TRIP_POINTS_COUNT; i++) {
      render(new ViewTripPoint(), eventsList.getElement());
    }
    render(new ViewFormCreate(), eventsList.getElement());
  }
}
