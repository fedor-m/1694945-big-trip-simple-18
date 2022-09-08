import { render, replace } from '../framework/render.js';
import ViewSort from '../view/view-sort.js';
import ViewTripEventsList from '../view/view-trip-events-list-create.js';
import { generateDestination } from '../mock/destinations.js';
import { generateOffersByType } from '../mock/offers.js';
import ViewNoEvents from '../view/view-no-events.js';
import ViewTripPoint from '../view/view-trip-point.js';
import ViewFormEdit from '../view/view-form-edit.js';
const ESCAPE_CODE = 'Escape';
export default class EventsPresenter {
  #presenterContainer;
  #model;
  #eventsList = new ViewTripEventsList();
  constructor(presenterContainer, model) {
    this.#presenterContainer = presenterContainer;
    this.#model = model;
  }

  init() {
    const points = this.#model.points;
    if(points.length === 0){
      render(new ViewNoEvents(), this.#presenterContainer);
    }
    else {
      render(new ViewSort(), this.#presenterContainer);
      render(this.#eventsList, this.#presenterContainer);
      for (const point of points) {
        const destination = generateDestination(point.destination);
        const offers = generateOffersByType(point.type, point.offers);
        this.#renderPoint(point, destination, offers);
      }
    }
  }

  #isEscKey = (key) => ESCAPE_CODE.indexOf(key) > -1;

  #renderPoint = (point, destination, offers) => {

    const pointComponent = new ViewTripPoint(point, destination, offers);
    const pointEditComponent = new ViewFormEdit(point, destination, offers);

    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };

    const replaceFormToPoint = () => {
      replace(pointComponent,pointEditComponent);
    };

    const onEscKeyDown = (evt) => {
      if (this.#isEscKey(evt.key)) {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const onFormReplace = () =>{
      replaceFormToPoint();
      document.removeEventListener('keydown', onEscKeyDown);
    };

    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });

    pointEditComponent.setFormSubmitHandler(() => {
      onFormReplace();
    });

    pointEditComponent.setEditClickHandler(()=>{
      onFormReplace();
    });

    render(pointComponent, this.#eventsList.element);
  };
}
