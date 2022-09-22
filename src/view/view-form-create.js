import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { generateDestination } from '../mock/destinations.js';
import { getAllOffersByType } from '../mock/offers.js';
import { TYPES } from '../mock/types.js';
import { DESTINATIONS } from '../mock/destinations.js';
import {
  getDateTimeFormatBasic,
  getCapitalizedString,
  getStringWithoutSpaces,
} from '../utils/point.js';
const createFormEditTemplate = (point) => {
  const { type, dateFrom, dateTo, basePrice, offers, destination } = point;
  const { name, description, pictures } = generateDestination(destination);
  const allOffers = getAllOffersByType(type);
  const listTypesMarkup = TYPES.map(
    (typeItem) => `
    <div class="event__type-item">
      <input
        id="event-type-${typeItem}-1"
        class="event__type-input visually-hidden"
        type="radio"
        name="event-type"
        value="${typeItem}"
        ${typeItem === type ? 'checked=""' : ''}
      >
      <label
        class="event__type-label event__type-label--${typeItem}"
        for="event-type-${typeItem}-1"
      >
        ${getCapitalizedString(typeItem)}
      </label>
    </div>`,
  ).join('');
  const listDestinationsMarkup = DESTINATIONS.map(
    (destinationItem) => `<option value="${destinationItem.name} "></option>`,
  ).join('');
  const offersListItemsMarkup = allOffers
    .map(
      (offer) => `
    <div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="event-${getStringWithoutSpaces(offer.title)}-1"
        type="checkbox"
        name="${getStringWithoutSpaces(offer.title)}"
        ${offers.includes(offer.id) ? 'checked=""' : ''}
      >
      <label
        class="event__offer-label"
        for="${getStringWithoutSpaces(offer.title)}-1"
      >
        <span class="event__offer-title">${offer.title}</span>
        +€&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`,
    )
    .join('');
  const listPicturesMarkup =
    pictures.length === 0
      ? []
      : pictures
        .map(
          (picture) =>
            `<img
              class="event__photo"
              src="${picture.src}"
              alt="Event photo">
            </img>`
        ).join('');
  const offersSectionMarkup =
    allOffers.length === 0
      ? ''
      : `<section class="event__section event__section--offers">
          <h3 class="event__section-title event__section-title--offers">
          Offers
          </h3>
          <div class="event__available-offers">
            ${offersListItemsMarkup}
          </div>
        </section>`;
  const destinationSectionMarkup =
    description.length === 0 && pictures.length === 0
      ? ''
      : `
        <section class="event__section event__section--destination">
          <h3 class="event__section-title event__section-title--destination">
          Destination
          </h3>
        ${description.length > 0
    ? `<p class="event__destination-description">${description}</p>`
    : ''}
    ${
  pictures.length > 0
    ? `<div class="event__photos-container">
    <div class="event__photos-tape">
        ${listPicturesMarkup}
    </div>
</div>`
    : ''
}</section>`;
  return `
  <li class="trip-events__item">
    <form
      class="event event--edit"
      action="#"
      method="post"
    >
      <header class="event__header">
        <div class="event__type-wrapper">
          <label
            class="event__type event__type-btn"
            for="event-type-toggle-1"
          >
            <span class="visually-hidden">Choose event type</span>
            <img
              class="event__type-icon"
              src="img/icons/${type}.png"
              alt="Event type icon"
              width="17"
              height="17"
            >
          </label>
          <input
            class="event__type-toggle visually-hidden"
            id="event-type-toggle-1"
            type="checkbox"
          >
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${listTypesMarkup}
            </fieldset>
          </div>
        </div>
        <div class="event__field-group event__field-group--destination">
          <label
            class="event__label event__type-output"
            for="event-destination-1"
          >
            ${type}
          </label>
          <input
            class="event__input event__input--destination"
            id="event-destination-1"
            type="text"
            name="event-destination"
            value="${name}"
            list="destination-list-1"
          >
          <datalist id="destination-list-1">
            ${listDestinationsMarkup}
          </datalist>
        </div>
        <div class="event__field-group event__field-group--time">
          <label
            class="visually-hidden"
            for="event-start-time-1"
          >From</label>
          <input
            class="event__input event__input--time"
            id="event-start-time-1"
            type="text"
            name="event-start-time"
            value="${getDateTimeFormatBasic(dateFrom)}"
          >
          —
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input
            class="event__input event__input--time"
            id="event-end-time-1"
            type="text"
            name="event-end-time"
            value="${getDateTimeFormatBasic(dateTo)}"
          >
        </div>
        <div
          class="event__field-group event__field-group--price">
          <label
            class="event__label"
            for="event-price-1"
          >
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input
            class="event__input  event__input--price"
            id="event-price-1"
            type="text"
            name="event-price"
            value="${basePrice}"
          >
        </div>
        <button
          class="event__save-btn btn btn--blue"
          type="submit"
        >Save</button>
        <button
          class="event__reset-btn"
          type="reset"
        >Delete</button>
        <button
          class="event__rollup-btn"
          type="button"
        >
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        ${offersSectionMarkup}
        ${destinationSectionMarkup}
    </section>
  </form>
</li>
`;
};
export default class ViewFormCreate extends AbstractStatefulView {
  constructor(point) {
    super();
    this._state = ViewFormCreate.parsePointToState(point);
    this.#setInnerHandlers();
  }

  get template() {
    return createFormEditTemplate(this._state);
  }

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.event__type-group')
      .addEventListener('change', this.#typeSelectHandler);
  };

  #typeSelectHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
    });
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(ViewFormCreate.parseStateToPoint(this._state));
  };

  setFormRollupHandler = (callback) => {
    this._callback.click = callback;
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formRollupHandler);
  };

  #formRollupHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setFormResetHandler = (callback) => {
    this._callback.formReset = callback;
    this.element
      .querySelector('form')
      .addEventListener('reset', this.#formResetHandler);
  };

  #formResetHandler = (evt) => {
    evt.preventDefault();
    this._callback.formReset();
  };

  static parsePointToState = (point) => ({
    ...point,
  });

  static parseStatePoint = (state) => {
    const point = {...state};
    return point;
  };
}
