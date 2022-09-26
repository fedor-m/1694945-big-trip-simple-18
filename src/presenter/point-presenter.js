import { render, replace, remove } from '../framework/render.js';
import ViewTripPoint from '../view/view-trip-point.js';
import ViewFormEdit from '../view/view-form-edit.js';
import { isEscKey } from '../utils/point.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
export default class PointPresenter {
  #eventsList;
  #changeData;
  #changeMode = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #point = null;
  #mode = Mode.DEFAULT;
  constructor(eventsList, changeData, changeMode)
  {
    this.#eventsList = eventsList;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new ViewTripPoint(this.#point);
    this.#pointEditComponent = new ViewFormEdit(this.#point);

    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
    this.#pointEditComponent.setFormRollupHandler(this.#handleFormRollup);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setFormResetHandler(this.#handleFormReset);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#eventsList);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  };

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  };

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#onEscKeyDown);
    this.#changeMode();
    this.#mode = Mode.EDITING;
  };

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeyDown);
    this.#mode = Mode.DEFAULT;
  };

  #onEscKeyDown = (evt) => {
    if (isEscKey(evt.key)) {
      evt.preventDefault();
      this.#pointEditComponent.reset(this.#point);
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  };

  #handleFormRollup = () => {
    this.#pointEditComponent.reset(this.#point);
    this.#replaceFormToPoint();
  };

  #handleFormSubmit = (point) => {
    this.#changeData(point);
    this.#replaceFormToPoint();
  };

  #handleFormReset = () => {
    this.#replaceFormToPoint();
  };
}

