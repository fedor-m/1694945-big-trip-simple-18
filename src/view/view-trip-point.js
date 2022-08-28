import { createElement } from '../render.js';
import dayjs from 'dayjs';
const createTripPointTemplate = (point, destination, offers) => {
  const { type, dateFrom, dateTo, basePrice } = point;
  const { name: destinationName } = destination;
  const options = offers.offers;
  let offersListItemsMarkup = '';
  for (const offer of options)
  {
    offersListItemsMarkup += (`<li class="event__offer">
        <span class="event__offer-title">${ offer.title }</span>`);
    offersListItemsMarkup += (offer.price !== undefined ? ` +€&nbsp;
        <span class="event__offer-price">${ offer.price }</span>` : '');
    offersListItemsMarkup += ('</li>');
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
        €&nbsp;<span class="event__price-value">${basePrice}</span>
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
export default class ViewTripPoint {
  constructor(point, destination, offers){
    this.point = point;
    this.destination = destination;
    this.offers = offers;
  }

  getTemplate() {
    return createTripPointTemplate(this.point, this.destination, this.offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
