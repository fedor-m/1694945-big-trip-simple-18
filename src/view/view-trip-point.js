import AbstractView from '../framework/view/abstract-view.js';
import {
  getDateFormatBasic,
  getDateFormatDay,
  getDateFormatTime,
  findDestinationByID,
  findOffersByType,
  findOffersPointSelected
} from '../utils/point.js';
const NO_ADDITIONAL_OFFERS = 'No additional offers';
const createTripPointTemplate = (point, destination, offers) => {
  const { type, dateFrom, dateTo, basePrice } = point;
  const offersListItemsMarkup =
    offers.length === 0
      ? `<li class="event__offer">
          <span class="event__offer-title">${ NO_ADDITIONAL_OFFERS }</span>
        </li>`
      : offers
        .map(
          (offer) =>
            `<li class="event__offer">
                <span class="event__offer-title">${offer.title}</span>
                +€&nbsp;
                <span class="event__offer-price">${offer.price}</span>
              </li>`
        )
        .join('');
  return `
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date"
        datetime="
          ${ getDateFormatBasic(dateFrom) }">
          ${ getDateFormatDay(dateFrom) }</time>
      <div class="event__type">
        <img
          class="event__type-icon"
          src="img/icons/${ type }.png"
          alt="Event type icon"
          width="42"
          height="42"
        >
      </div>
      <h3 class="event__title">${type} ${ destination }</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time"
            datetime="
            ${ getDateFormatBasic(dateFrom) }
            T
            ${ getDateFormatTime(dateFrom) }">
            ${ getDateFormatTime(dateFrom) }</time>
          —
          <time class="event__end-time"
            datetime="
            ${ getDateFormatBasic(dateTo) }
            T
            ${ getDateFormatTime(dateTo) } ">
            ${ getDateFormatTime(dateTo) }
          </time>
        </p>
      </div>
      <p class="event__price">
        €&nbsp;<span class="event__price-value">${ basePrice }</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${ offersListItemsMarkup }
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
  </div>
</li>`;
};
export default class ViewTripPoint extends AbstractView {
  #point = null;
  #destination = null;
  #offers = [];

  constructor(point, destinations, offers) {
    super();
    this.#point = point;
    this.#destination = findDestinationByID(destinations, point.destination).name;
    this.#offers = findOffersPointSelected(findOffersByType(offers, point.type), point.offers);
  }

  get template() {
    return createTripPointTemplate(this.#point, this.#destination, this.#offers);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };
}
