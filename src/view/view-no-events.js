import AbstractView from '../framework/view/abstract-view.js';
import { NoEventsTextType } from '../mock/filters.js';

const createNoEventsMsgTemplate = (filterType) => {
  const NoEventsTextValue = NoEventsTextType[filterType];
  return (`<p class="trip-events__msg">${NoEventsTextValue}</p>`);
};

export default class ViewNoEvents extends AbstractView {
  #filterType = null;

  constructor (filterType) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createNoEventsMsgTemplate(this.#filterType);
  }
}
