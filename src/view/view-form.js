import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {
  getDateTimeFormatBasic,
  getCapitalizedString,
  getStringWithoutSpaces,
  formatDateToISOString,
  getEventTypes,
  findDestinationByID,
  findDestinationByName,
  findOffersByType,
  findOffersPointSelected,
} from '../utils/utils.js';
import { MIN_PRICE, ViewFormType, ViewFormTypeResetButtonText } from '../const/form.js';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';

const DATE_FORMAT_INPUT = 'd/m/y H:i';
const MINUTE_INCREMENT = 1;
const RADIX = 10;

const createEventTypeTemplate = (offers, type, isDisabled) => {
  const types = getEventTypes(offers);
  const eventTypesMarkup = types
    .map(
      (item) => `
    <div class="event__type-item">
      <input
        id="event-type-${item}-1"
        class="event__type-input visually-hidden"
        type="radio"
        name="event-type"
        value="${item}"
        ${item === type ? 'checked=""' : ''}
        ${isDisabled ? 'disabled' : ''}
      >
      <label
        class="event__type-label event__type-label--${item}"
        for="event-type-${item}-1"
      >
        ${getCapitalizedString(item)}
      </label>
    </div>`,
    )
    .join('');
  return `
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
        ${isDisabled ? 'disabled' : ''}
  	  >
  	  <div class="event__type-list">
  	    <fieldset class="event__type-group">
  	      <legend class="visually-hidden">Event type</legend>
  	      ${eventTypesMarkup}
  	    </fieldset>
  	  </div>
	</div>
`;
};
const createEventFieldGroupDestinationTemplate = (
  type,
  destination,
  destinations,
  isDisabled
) => {
  const destinationName =
    !!destination && !!destination.name && destination.name.length > 0
      ? destination.name
      : '';
  const datalistOptions = destinations
    .map((item) => `<option value="${item.name}" ${isDisabled ? 'disabled' : ''}></option>`)
    .join();
  return `
    <div class="event__field-group event__field-group--destination">
      <label
        class="event__label  event__type-output"
        for="event-destination-1"
      >
        ${type}
      </label>
      <input
        class="event__input event__input--destination"
        id="event-destination-1"
        type="text"
        name="event-destination"
        value="${destinationName}"
        ${isDisabled ? 'disabled' : ''}
        list="destination-list-1">
      <datalist id="destination-list-1">
        ${datalistOptions}
      </datalist>
    </div>
  `;
};
const createEventFieldGroupTimeTemplate = (
  dateFrom,
  dateTo,
  isDisabled
) => {
  const dateStart = getDateTimeFormatBasic(dateFrom);
  const dateEnd = getDateTimeFormatBasic(dateTo);
  return `
    <div class="event__field-group event__field-group--time">
    <label
      class="visually-hidden"
      for="event-start-time-1"
    >
    From
    </label>
    <input
      class="event__input event__input--time"
      id="event-start-time-1"
      type="text"
      name="event-start-time"
      value="${dateStart}"
      ${isDisabled ? 'disabled' : ''}
    >
    &nbsp;
    —
    &nbsp;
    <label
      class="visually-hidden"
      for="event-end-time-1"
    >
    To
    </label>
    <input
      class="event__input event__input--time"
      id="event-end-time-1"
      type="text"
      name="event-end-time"
      value="${dateEnd}"
      ${isDisabled ? 'disabled' : ''}
    >
    </div>
  `;
};
const createEventFieldGroupPriceTemplate = (price, isDisabled) =>
  `<div
      class="event__field-group event__field-group--price"
    >
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
        value="${price}"
        ${isDisabled ? 'disabled' : ''}
      >
  </div>`;
const createRollupButtonTemplate = (formType) =>
  formType === ViewFormType.EDIT_FORM
    ? `<button
      class="event__rollup-btn"
      type="button"
    >
      <span class="visually-hidden">
        Open event
      </span>
    </button>`
    : '';
const createEventSectionDestinationTemplate = (destination, formType) => {
  if (!destination) {
    return '';
  }
  const { description, pictures } = destination;
  const checkDescription = () => !!description && description.length > 0;
  const checkPictures = () =>
    formType === ViewFormType.ADD_FORM && !!pictures && pictures.length > 0;
  const eventPicturesTemplate = checkPictures()
    ? `
      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${pictures
    .map(
      (picture) =>
        `<img
            class='event__photo'
            src='${picture.src}'
            alt='${picture.description}'
          >`,
    )
    .join('')}
        </div>
      </div>`
    : '';
  const eventSectionDestination = checkDescription()
    ? `
    <section class="event__section event__section--destination">
      <h3 class="event__section-title event__section-title--destination">
        Destination
      </h3>
      <p class="event__destination-description">${description}</p>
      ${eventPicturesTemplate}
    </section>`
    : '';
  return `
    <section class='event__details'>
      ${eventSectionDestination}
    </section>
  `;
};
const createEventSectionOffersTemplate = (options, offers, isDisabled) => {
  const offersListItemsTemplate = offers
    .map(
      (offer) =>
        `<div class="event__offer-selector">
      <input
        class="event__offer-checkbox visually-hidden"
        id="event-offer-${getStringWithoutSpaces(offer.title)}-1"
        type="checkbox"
        name="event-${getStringWithoutSpaces(offer.title)}"
        ${options.find((option) => option.id === offer.id) ? 'checked=""' : ''}
        value="${offer.id}"
        ${isDisabled ? 'disabled' : ''}
      >
      <label
        class="event__offer-label"
        for="event-offer-${getStringWithoutSpaces(offer.title)}-1"
      >
        <span class="event__offer-title">${offer.title}</span>
        +€&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`,
    )
    .join('');

  return offers.length > 0
    ? `
  <section class="event__section  event__section--offers">
    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
    <div class="event__available-offers">
      ${offersListItemsTemplate}
    </div>
  </section>`
    : '';
};
const createSubmitButtonTemplate = (isDisabled, isSaving) => `
  <button
    class="event__save-btn btn btn--blue"
    type="submit"
    ${isDisabled ? 'disabled' : ''}
  >
  ${isSaving ? 'Saving' : 'Save'}
  </button>`;
const createResetButtonTemplate = (formType, isDisabled, isDeleting) =>
  `<button
    class="event__reset-btn"
    type="reset"
    ${isDisabled ? 'disabled' : ''}
  >
    ${isDeleting ? 'Deleting' : ViewFormTypeResetButtonText[formType]}
  </button>`;
const createFormTemplate = (
  point,
  destinations,
  offers,
  formType) => {
  const {
    type,
    destination,
    dateFrom,
    dateTo,
    basePrice,
    offers: options,
    isDisabled,
    isDeleting,
    isSaving
  } = point;

  const offersByType = findOffersByType(offers, type);
  const eventTypeTemplate = createEventTypeTemplate(offers, type, isDisabled);
  const eventFieldGroupDestinationTemplate = createEventFieldGroupDestinationTemplate(
    type,
    destination,
    destinations,
    isDisabled
  );
  const eventFieldGroupTimeTemplate = createEventFieldGroupTimeTemplate(
    dateFrom,
    dateTo,
    isDisabled
  );
  const eventFieldGroupPriceTemplate = createEventFieldGroupPriceTemplate(
    basePrice,
    isDisabled
  );
  const submitButtonTemplate = createSubmitButtonTemplate(isDisabled, isSaving);
  const resetButtonTemplate = createResetButtonTemplate(formType, isDisabled, isDeleting);
  const rollupButtonTemplate = createRollupButtonTemplate(formType);
  const eventSectionDestinationTemplate = createEventSectionDestinationTemplate(
    destination,
    formType,
  );
  const eventSectionOffersTemplate = createEventSectionOffersTemplate(
    options,
    offersByType,
    isDisabled
  );
  return `
    <li class="trip-events__item">
      <form
        class="event event--edit"
        action="#"
        method="post"
      >
        <header class="event__header">
          ${eventTypeTemplate}
          ${eventFieldGroupDestinationTemplate}
          ${eventFieldGroupTimeTemplate}
          ${eventFieldGroupPriceTemplate}
          ${submitButtonTemplate}
          ${resetButtonTemplate}
          ${rollupButtonTemplate}
        </header>
        ${eventSectionDestinationTemplate}
        ${eventSectionOffersTemplate}
      </form>
      </li>
    `;
};
export default class ViewForm extends AbstractStatefulView {
  #formType = null;
  #destinations = [];
  #offers = [];
  #datetimePickerFrom = null;
  #datetimePickerTo = null;
  constructor(point, destinations, offers, formType) {
    super();
    this.#destinations = destinations;
    this.#offers = offers;
    this._state = ViewForm.parsePointToState(point, destinations, offers);
    this.#formType = formType;
    this.#setInnerHandlers();
    this.#setDatetimeFromDatepicker();
    this.#setDatetimeToDatepicker();
  }

  get template() {
    return createFormTemplate(
      this._state,
      this.#destinations,
      this.#offers,
      this.#formType,
    );
  }

  #restoreFormHandlers = () => {
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormRollupHandler(this._callback.click);
    this.setFormResetHandler(this._callback.formReset);
  };

  _restoreHandlers = () => {
    this.#setDatetimeFromDatepicker();
    this.#setDatetimeToDatepicker();
    this.#setInnerHandlers();
    this.#restoreFormHandlers();
  };

  #setInnerHandlers = () => {
    this.element
      .querySelector('.event__type-group')
      .addEventListener('change', this.#typeChangeHandler);
    this.element
      .querySelector('.event__input--destination')
      .addEventListener('change', this.#destinationChangeHandler);
    Array.from(
      this.element.querySelectorAll('.event__offer-checkbox'),
    ).forEach((eventType) =>
      eventType.addEventListener('change', this.#offersChangeHandler),
    );
    this.element
      .querySelector('.event__input--price')
      .addEventListener('change', this.#priceChangeHandler);
  };

  #typeChangeHandler = (evt) => {
    this.updateElement({
      type: he.encode(evt.target.value),
      offers: []
    });
  };

  #destinationChangeHandler = (evt) => {
    const destinationValue = he.encode(evt.target.value.trim());
    const destination = findDestinationByName(
      this.#destinations,
      destinationValue,
    );
    if (!destination) {
      evt.target.value = he.encode(this._state.destination.name);
      return;
    }
    this.updateElement({
      destination: findDestinationByID(this.#destinations, destination.id),
    });
  };

  #offersChangeHandler = () => {
    const selectedOffers = Array.from(
      this.element.querySelectorAll('.event__offer-checkbox'),
    )
      .filter((offer) => offer.checked)
      .map((offer) => Number(he.encode(offer.value)));
    const offers = this._state.offersByType.filter((offer) =>
      selectedOffers.includes(offer.id),
    );
    this.updateElement({
      offers,
    });
  };

  #priceChangeHandler = (evt) => {
    const basePrice = parseInt(he.encode(evt.target.value.trim()), RADIX);
    if (isNaN(basePrice) || basePrice < MIN_PRICE) {
      this._state.isDisabled = true;
      evt.target.value = parseInt(he.encode(String(this._state.basePrice)), RADIX);
      this._state.isDisabled = false;
      return;
    }
    this.updateElement({
      basePrice,
    });
  };

  #setDatetimeFromDatepicker = () => {
    this.#datetimePickerFrom = flatpickr(
      this.element.querySelector('.event__input--time[name=event-start-time]'),
      {
        dateFormat: DATE_FORMAT_INPUT,
        enableTime: true,
        maxDate: this._state.dateTo,
        onChange: this.#dateFromChangeHandler,
        'time_24hr': true,
        minuteIncrement: MINUTE_INCREMENT,
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
        onChange: this.#dateToChangeHandler,
        'time_24hr': true,
        minuteIncrement: MINUTE_INCREMENT,
      },
    );
  };

  #dateFromChangeHandler = ([dateFrom]) => {
    this.updateElement({
      dateFrom: formatDateToISOString(he.encode(String(dateFrom))),
    });
  };

  #dateToChangeHandler = ([dateTo]) => {
    this.updateElement({
      dateTo: formatDateToISOString(he.encode(String(dateTo))),
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
      ViewForm.parsePointToState(point, this.#destinations, this.#offers),
    );
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit(ViewForm.parseStateToPoint(this._state));
  };

  setFormRollupHandler = (callback) => {
    if(this.#formType === ViewFormType.ADD_FORM)
    {
      return;
    }
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
    this._callback.formReset(ViewForm.parseStateToPoint(this._state));
  };

  static parsePointToState = (point, destinations, offers) => {
    const offersByType = findOffersByType(offers, point.type);
    return {
      ...point,
      offers: findOffersPointSelected(offersByType, point.offers),
      offersByType: offersByType,
      destination: findDestinationByID(destinations, point.destination),
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  };

  static parseStateToPoint = (state) => {
    const point = {
      ...state,
      offers: state.offers.map((offer) => offer?.id),
      destination: state.destination.id,
    };
    delete point.offersByType;
    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;
    return point;
  };
}
