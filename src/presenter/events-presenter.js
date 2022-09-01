import { render } from '../render.js';
import ViewTripEventsList from '../view/view-trip-events-list-create.js';
import { generateDestination } from '../mock/destinations.js';
import { generateOffersByType } from '../mock/offers.js';
import ViewTripPoint from '../view/view-trip-point.js';
import ViewFormEdit from '../view/view-form-edit.js';

export default class EventsPresenter {
  #presenterContainer = null;
  #model = null;
  #eventsList = new ViewTripEventsList();

  constructor(presenterContainer, model) {
    this.#presenterContainer = presenterContainer;
    this.#model = model;
  }

  init() {
    const points = this.#model.points;
    render(this.#eventsList, this.#presenterContainer);
    for (const point of points) {
      const destination = generateDestination(point.destination);
      const offers = generateOffersByType(point.type, point.offers);
      this.#renderPoint(point, destination, offers);
    }
  }

  #renderPoint = (point, destination, offers) => {
    const pointComponent = new ViewTripPoint(point, destination, offers);
    const pointEditComponent = new ViewFormEdit(point, destination, offers);
    const replacePointToForm = () => {
      this.#eventsList.element.replaceChild(
        pointEditComponent.element,
        pointComponent.element,
      );
    };

    const replaceFormToPoint = () => {
      this.#eventsList.element.replaceChild(
        pointComponent.element,
        pointEditComponent.element,
      );
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const onFormReplace = () =>{
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    };

    pointComponent.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', () => {
        replacePointToForm();
        document.addEventListener('keydown', onEscKeyDown);
      });

    pointEditComponent.element
      .querySelector('form')
      .addEventListener('submit', (evt) => {
        evt.preventDefault();
        onFormReplace();
      });

    pointEditComponent.element
      .querySelector('.event__rollup-btn')
      .addEventListener('click', () => {
        onFormReplace();
      });
    render(pointComponent, this.#eventsList.element);
  };
}
