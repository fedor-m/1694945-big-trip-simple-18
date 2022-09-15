import { render, replace } from '../framework/render.js';
import ViewTripPoint from '../view/view-trip-point.js';
import ViewFormEdit from '../view/view-form-edit.js';
import { isEscKey } from '../utils.js';
export default class PointPresenter {
  #eventsList;
  #pointComponent = null;
  #pointEditComponent = null;
  #point = null;
  #destination = null;
  #offers = null;
  constructor(eventsList)
  {
    this.#eventsList = eventsList;
  }

  init = (point, destination, offers) => {
    this.#point = point;
    this.#destination = destination;
    this.#offers = offers;
    this.#pointComponent = new ViewTripPoint(point, destination, offers);
    this.#pointEditComponent = new ViewFormEdit(point, destination, offers);
    this.#pointComponent.setEditClickHandler(() => {
      this.#replacePointToForm();
      document.addEventListener('keydown', this.#onEscKeyDown);
    });

    this.#pointEditComponent.setFormSubmitHandler(() => {
      this.#onFormReplace();
    });

    this.#pointEditComponent.setEditClickHandler(() => {
      this.#onFormReplace();
    });

    render(this.#pointComponent, this.#eventsList);
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
  };

  #onEscKeyDown = (evt) => {
    if (isEscKey(evt.key)) {
      evt.preventDefault();
      this.#replaceFormToPoint();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #onFormReplace = () => {
    this.#replaceFormToPoint();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };
}
