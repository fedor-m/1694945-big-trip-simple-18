import AbstractView from '../framework/view/abstract-view.js';
const createTripEventsListTemplate = () => `
    <ul class="trip-events__list"></ul>
  `;
export default class ViewTripEventsList extends AbstractView {
  get template() {
    return createTripEventsListTemplate();
  }
}
