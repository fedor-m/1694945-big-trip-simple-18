import AbstractView from '../framework/view/abstract-view.js';
import { TYPES } from '../mock/types.js';
import { DESTINATIONS } from '../mock/destinations.js';
import { OFFERS } from '../mock/offers.js';
import dayjs from 'dayjs';
const createFormCreateTemplate = (point, destination, offers) => {
  const { type: pointType, dateFrom, dateTo, basePrice } = point;
  const { name, description, pictures } = destination;
  const { offers: selectedOffers } = offers;
  const allOffers = OFFERS.filter((offer)=>offer.id !== 0);
  const listTypesMarkup = TYPES.map((type) => (`
  <div class="event__type-item">
    <input id="event-type-${ type }-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${ type }" ${ type === pointType ? 'checked=""' : '' }>
    <label class="event__type-label  event__type-label--${ type }" for="event-type-${ type }-1">${ type[0].toUpperCase() }${ type.slice(1) }</label>
  </div>`)).join('');
  const listDestinationsMarkup = DESTINATIONS.map((destinationItem) => (`<option value="${ destinationItem.name} "></option>`)).join('');
  const listOffersMarkup = allOffers.map((offer) => {
    const selected = (selectedOffers.find((selectedOffer) => selectedOffer.id === offer.id)) ? 'checked=""' : '';
    return (`
    <div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-${ offer.title.replaceAll(' ', '-').toLowerCase() }-1" type="checkbox" name="${ offer.title.replaceAll (' ', '-').toLowerCase()}" ${ selected }>
      <label class="event__offer-label" for="${ offer.title.replaceAll(' ', '-').toLowerCase () }-1">
        <span class="event__offer-title">${ offer.title }</span>
        +€&nbsp;
        <span class="event__offer-price">${ offer.price }</span>
      </label>
    </div>`);
  }).join('');
  const listPicturesMarkup = pictures.map((picture) => (`<img class="event__photo" src="${ picture.src }" alt="Event photo"></img>`)).join('');
  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" src="img/icons/${pointType}.png" alt="Event type  icon"  width="17" height="17">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1"     type="checkbox">
          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${ listTypesMarkup }
            </fieldset>
          </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${ pointType }
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1"     type="text"
            name="event-destination" value="${ name }" list="destination-list-1">
          <datalist id="destination-list-1">
            ${ listDestinationsMarkup }
          </datalist>
        </div>
        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1"   type="text"   name="event-start-time"
            value="${ dayjs(dateFrom).format('DD/MM/YY HH:MM') }">
          —
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1"   type="text"   name="event-end-time"
            value="${ dayjs(dateTo).format('DD/MM/YY HH:MM') }">
        </div>
        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text"     name="event-price" value="${ basePrice }">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${ listOffersMarkup }
          </div>
        </section>
        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">${ description }</p>
          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${ listPicturesMarkup }
            </div>
          </div>
        </section>
      </section>
    </form>
  </li>`;
};
export default class ViewFormCreate extends AbstractView {
  #element = null;
  #point = null;
  #destination = null;
  #offers = null;

  constructor(point, destination, offers){
    super();
    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;
  }

  get template() {
    return createFormCreateTemplate(this.#point, this.#destination, this.#offers);
  }
}
