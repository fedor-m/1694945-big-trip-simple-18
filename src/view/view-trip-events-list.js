import AbstractView from '../framework/view/abstract-view.js';
const createTripEventsListTemplate = () => `
    <ul class="trip-events__list"></ul>
  `;
export default class ViewTripEventsList extends AbstractView {
  constructor() {
    super();
    this.#setInnerHandlers();
  }

  get template() {
    return createTripEventsListTemplate();
  }

  #setInnerHandlers = () => {
    document.querySelector('.trip-main__event-add-btn').addEventListener('click', this.#createNewEventHandler);
  };

  setCreateNewEventHandler = (callback) => {
    this._callback.createNewEvent = callback;
    this._callback.button = document.querySelector('.trip-main__event-add-btn');
  };

  #createNewEventHandler = (evt) => {
    evt.preventDefault();
    this._callback.createNewEvent();
    this._callback.button.disabled = true;
  };
}
