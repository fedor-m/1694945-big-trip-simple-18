import AbstractView from '../framework/view/abstract-view.js';
import dayjs from 'dayjs';
import { generateDestination } from '../mock/destinations.js';
import { generateOffersByType } from '../mock/offers.js';
const createTripPointTemplate = (point) => {
  const { type, dateFrom, dateTo, basePrice } = point;
  const destinationName = generateDestination(point.destination).name;
  const offers = generateOffersByType(point.type, point.offers).offers;
  const offersListItemsMarkup = [];
  for (const offer of offers)
  {
    offersListItemsMarkup.push(`
      <li class="event__offer">
        <span class="event__offer-title">${ offer.title }</span> ${ (offer.price !== undefined ? ` +€&nbsp; <span class="event__offer-price">${ offer.price }</span>` : '')}
      </li>`
    ) ;
  }
  return `
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${dayjs(dateFrom).format('YYYY-MM-DD')}">${dayjs(dateFrom).format('MMM D')}</time>
      <div class="event__type">
        <img class="event__type-icon" src="img/icons/${type}.png" alt="Event type icon" width="42" height="42">
      </div>
      <h3 class="event__title">${type} ${destinationName}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${dayjs(dateFrom).format('YYYY-MM-DD')}T${dayjs(dateFrom).format('HH:MM')}">${dayjs(dateFrom).format('HH:MM')}</time>
          —
          <time class="event__end-time" datetime="${dayjs(dateTo).format('YYYY-MM-DD')}T${dayjs(dateTo).format('HH:MM')}">${dayjs(dateTo).format('HH:MM')}</time>
        </p>
      </div>
      <p class="event__price">
        €&nbsp;<span class="event__price-value">${ basePrice }</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${ offersListItemsMarkup.join('') }
      </ul>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
  </div>
</li>`;
};
export default class ViewTripPoint extends AbstractView {
  #point = null;

  constructor(point){
    super();
    this.#point = point;
  }

  get template() {
    return createTripPointTemplate(this.#point);
  }

  setEditClickHandler = (callback) => {
    this._callback.editClick = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#editClickHandler);
  };

  #editClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.editClick();
  };
}
