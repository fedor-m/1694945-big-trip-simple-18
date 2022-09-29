import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { findDestinationByID, DESTINATIONS, findDestinationByName } from '../mock/destinations.js';
import { getAllOffersByType } from '../mock/offers.js';
import { TYPES } from '../const/types.js';
import {
  getDateTimeFormatBasic,
  getCapitalizedString,
  getStringWithoutSpaces,
  getNumberFromString,
  formatDateToISOString
} from '../utils/point.js';
import { MIN_PRICE, ViewFormType, ViewFormTypeButton } from '../const/form.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const DATE_FORMAT_INPUT = 'd/m/y H:i';
const createFormTemplate = (point, formType) => {
  const { type, dateFrom, dateTo, basePrice, offers, destination } = point;
  const { name, description, pictures } = findDestinationByID(destination);
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
    !pictures || pictures.length === 0
      ? []
      : pictures
        .map(
          (picture) =>
            `<img
              class="event__photo"
              src="${picture.src}"
              alt="${picture.description}">
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
    (!description || description.length === 0) && (!pictures || pictures.length === 0)
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
  const rollupButtonMarkup = formType === ViewFormType.EDIT_FORM ? '<button class="event__rollup-btn" type="button"><span class="visually-hidden">Open event</span></button>' : '';

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
        >${ViewFormTypeButton[formType]}</button>
        ${rollupButtonMarkup}
      </header>
      <section class="event__details">
        ${offersSectionMarkup}
        ${destinationSectionMarkup}
    </section>
  </form>
</li>
`;
};
export default class ViewForm extends AbstractStatefulView {
  #datetimePickerFrom = null;
  #datetimePickerTo = null;
  #formType = null;
  constructor(point, formType) {
    super();
    this.#formType = formType;
    this._state = ViewForm.parsePointToState(point);
    this.#setDatetimeFromDatepicker();
    this.#setDatetimeToDatepicker();
    this.#setInnerHandlers();
  }

  get template() {
    return createFormTemplate(this._state, this.#formType);
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
      .querySelector('form')
      .addEventListener('submit', this.#formSubmitHandler);
    this.element
      .querySelector('form')
      .addEventListener('reset', this.#formResetHandler);
    if(this.#formType === ViewFormType.EDIT_FORM) {
      this.element
        .querySelector('.event__rollup-btn')
        .addEventListener('click', this.#formRollupHandler);
    }
  };

  #typeSelectHandler = (evt) => {
    this.updateElement({
      type: evt.target.value,
    });
  };

  #destinationSelectHandler = (evt) => {
    const destinationValue = evt.target.value.trim();
    const foundDestination = findDestinationByName(destinationValue);
    if(!foundDestination)
    {
      evt.target.value = findDestinationByID(this._state.destination).name;
      return;
    }
    this.updateElement({
      destination: foundDestination.id,
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
    const price = Number(evt.target.value.trim());
    if(isNaN(price) || price < MIN_PRICE) {
      evt.target.value = Number(this._state.basePrice);
      return;
    }
    this.updateElement({
      basePrice: price
    });
  };

  #setDatetimeFromDatepicker = () => {
    this.#datetimePickerFrom = flatpickr(
      this.element.querySelector('.event__input--time[name=event-start-time]'),
      {
        dateFormat: DATE_FORMAT_INPUT,
        enableTime: true,
        maxDate: this._state.dateTo,
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
      dateFrom: formatDateToISOString(dateFrom),
    });
  };

  #dateToSelectHandler = ([dateTo]) => {
    this.updateElement({
      dateTo: formatDateToISOString(dateTo),
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
      ViewForm.parsePointToState(point),
    );
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(ViewForm.parseStateToPoint(this._state));
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
    this._callback.formReset(ViewForm.parseStateToPoint(this._state));
  };

  static parsePointToState = (point) => ({
    ...point,
  });

  static parseStateToPoint = (state) => {
    const point = {...state};
    return point;
  };
}
