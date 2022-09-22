import AbstractView from '../framework/view/abstract-view.js';
import {
  getDateFormatBasic,
  getDateFormatDay,
  getDateFormatTime
} from '../utils/point.js';
import { generateDestination } from '../mock/destinations.js';
import { getOffersByType } from '../mock/offers.js';
const NO_ADDITIONAL_OFFERS = 'No additional offers';
const createTripPointTemplate = (point) => {
  const { type, dateFrom, dateTo, basePrice, destination, offers } = point;
  const destinationName = generateDestination(destination).name;
  const selectedOffers = getOffersByType(type, offers);
  const offersListItemsMarkup =
    selectedOffers.length === 0
      ? `<li class="event__offer">
          <span class="event__offer-title">${ NO_ADDITIONAL_OFFERS }</span>
        </li>`
      : selectedOffers
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
      <h3 class="event__title">${type} ${ destinationName }</h3>
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

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createTripPointTemplate(this.#point);
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
