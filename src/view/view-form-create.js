import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { generateDestination, DESTINATIONS } from '../mock/destinations.js';
import { getAllOffersByType } from '../mock/offers.js';
import { TYPES } from '../const/types.js';
import {
  getDateTimeFormatBasic,
  getCapitalizedString,
  getStringWithoutSpaces,
  getNumberFromString
} from '../utils/point.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const DATE_FORMAT_INPUT = 'd/m/Y H:i';
const createFormEditTemplate = (point) => {
  const { type, dateFrom, dateTo, basePrice, offers, destination } = point;
  const { name, description, pictures } = generateDestination(destination);
  const dateStart = getDateTimeFormatBasic(dateFrom);
  const dateEnd = getDateTimeFormatBasic(dateTo);
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
    (destinationItem) => `<option value="${destinationItem.name}"></option>`,
  ).join('');
  const offersListItemsMarkup = allOffers
    .map(
      (offer) => `
    <div class="event__offer-selector">
      <input
        class="event__offer-checkbox  visually-hidden"
        id="event-offer-${getStringWithoutSpaces(offer.title)}-${offer.id}"
        type="checkbox"
        name="event-${getStringWithoutSpaces(offer.title)}"
        ${offers.includes(offer.id) ? 'checked=""' : ''}
      >
      <label
        class="event__offer-label"
        for="event-offer-${getStringWithoutSpaces(offer.title)}-${offer.id}"
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
            value="${dateStart}"
          >
          —
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input
            class="event__input event__input--time"
            id="event-end-time-1"
            type="text"
            name="event-end-time"
            value="${dateEnd}"
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
export default class ViewFormEdit extends AbstractStatefulView {
  #datetimePickerFrom = null;
  #datetimePickerTo = null;
  constructor(point) {
    super();
    this._state = ViewFormEdit.parsePointToState(point);
    this.#setDatetimeFromDatepicker();
    this.#setDatetimeToDatepicker();
    this.#setInnerHandlers();
  }

  get template() {
    return createFormEditTemplate(this._state);
  }

  _restoreHandlers = () => {
    this.#setDatetimeFromDatepicker();
    this.#setDatetimeToDatepicker();
    this.#setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormRollupHandler(this._callback.click);
    this.setFormResetHandler(this._callback.formReset);
  };

  #setInnerHandlers = () => {
    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#typeSelectHandler);
    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationSelectHandler);
    Array.from(this.element.querySelectorAll('.event__offer-checkbox'))
      .forEach((eventType) => eventType.addEventListener('change', this.#offersSelectHandler));
    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#priceSelectHandler);
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#formRollupHandler);
    this.element
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element
      .querySelector('form')
      .addEventListener('reset', this.#formResetHandler);
  };

  #typeSelectHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
    });
  };

  #destinationSelectHandler = (evt) => {
    const destinationValue = evt.target.value.trim();
    const selectedDestination = DESTINATIONS.find(
      (destination) => destination.name === destinationValue
    );
    if(!selectedDestination)
    {
      evt.preventDefault();
      return;
    }
    this.updateElement({
      destination: selectedDestination.id,
      offers: [],
    });
  };

  #offersSelectHandler = () =>{
    const offers = [];
    Array.from(this.element.querySelectorAll('.event__offer-checkbox'))
      .forEach((checkbox) => checkbox.checked ?
        offers.push(getNumberFromString(checkbox.id)) : '');
    this.updateElement({
      offers
    });
  };

  #priceSelectHandler = (evt) => {
    const price = evt.target.value.trim();
    if(isNaN(price) || Number(price) <= 0)
    {
      evt.preventDefault();
      return;
    }
    this.updateElement({
      basePrice: Number(price)
    });
  };

  #setDatetimeFromDatepicker = () => {
    this.#datetimePickerFrom = flatpickr(
      this.element.querySelector('.event__input--time[name=event-start-time]'),
      {
        dateFormat: DATE_FORMAT_INPUT,
        enableTime: true,
        onChange: this.#dateFromSelectHandler,
        'time_24hr': true,
        minuteIncrement: 1,
      },
    );
  };

  #setDatetimeToDatepicker = () => {
    this.#datetimePickerTo = flatpickr(
      this.element.querySelector('.event__input--time[name=event-end-time]'),
      {
        dateFormat: DATE_FORMAT_INPUT,
        enableTime: true,
        minDate: this._state.dateFrom,
        onChange: this.#dateToSelectHandler,
        'time_24hr': true,
        minuteIncrement: 1,
      },
    );
  };

  #dateFromSelectHandler = ([dateFrom]) => {
    this.updateElement({
      dateFrom,
    });
  };

  #dateToSelectHandler = ([dateTo]) => {
    this.updateElement({
      dateTo,
    });
  };

  removeElement = () => {
    super.removeElement();
    if (this.#datetimePickerFrom) {
      this.#datetimePickerFrom.destroy();
      this.#datetimePickerFrom = null;
    }
    if (this.#datetimePickerTo) {
      this.#datetimePickerTo.destroy();
      this.#datetimePickerTo = null;
    }
  };

  reset = (point) => {
    this.updateElement(
      ViewFormEdit.parsePointToState(point),
    );
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(ViewFormEdit.parseStateToPoint(this._state));
  };

  setFormRollupHandler = (callback) => {
    this._callback.click = callback;
  };

  #formRollupHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  };

  setFormResetHandler = (callback) => {
    this._callback.formReset = callback;
  };

  #formResetHandler = (evt) => {
    evt.preventDefault();
    this._callback.formReset(ViewFormEdit.parseStateToPoint(this._state));
  };

  static parsePointToState = (point) => ({
    ...point,
  });

  static parseStateToPoint = (state) => {
    const point = {...state};
    return point;
  };
}
