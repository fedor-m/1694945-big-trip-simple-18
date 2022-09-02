import { createElement } from '../render.js';
const createTripNoEventsMsgTemplate = () => `
<p class="trip-events__msg">Click New Event to create your first point</p>
  `;
export default class ViewNoEvents {
  #element = null;

  get template() {
    return createTripNoEventsMsgTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.element = null;
  }
}
