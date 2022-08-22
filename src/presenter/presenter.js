import ViewFormEdit from '../view/view-form-edit.js';
import ViewTripPoint from '../view/view-trip-point.js';
import { render } from '../render.js';

export default class Presenter{
  init = (presenterContainer) => {
    this.presenterContainer = presenterContainer;
    const TRIP_POINTS_COUNT = 3;
    render(new ViewFormEdit(), this.presenterContainer);
    for (let i = 0; i < TRIP_POINTS_COUNT; i++) {
      render(new ViewTripPoint(), this.presenterContainer);
    }
  };
}
