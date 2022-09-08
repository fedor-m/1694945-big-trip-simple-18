import AbstractView from '../framework/view/abstract-view.js';
const createTripNoEventsMsgTemplate = () => `
<p class="trip-events__msg">Click New Event to create your first point</p>
  `;
export default class ViewNoEvents extends AbstractView {
  get template() {
    return createTripNoEventsMsgTemplate();
  }
}
