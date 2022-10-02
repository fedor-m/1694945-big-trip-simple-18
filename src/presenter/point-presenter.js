import { render, replace, remove } from '../framework/render.js';
import ViewTripPoint from '../view/view-trip-point.js';
import ViewForm from '../view/view-form.js';
import { isEscKey } from '../utils/utils.js';
import { UserAction, UpdateType } from '../const/actions.js';
import { ViewFormType } from '../const/form.js';
const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};
export default class PointPresenter {
  #eventsList = null;
  #destinations = [];
  #offers = [];
  #changeData = null;
  #changeMode = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #point = null;
  #mode = Mode.DEFAULT;
  constructor(eventsList, destinations, offers, changeData, changeMode) {
    this.#eventsList = eventsList;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    this.#point = point;

    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#setPointComponent();
    this.#setPointEditComponent();

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this.#pointComponent, this.#eventsList);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#pointComponent, prevPointComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#pointEditComponent, prevPointEditComponent);
      this.#mode = Mode.DEFAULT;
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

  setSaving = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isSaving: true,
      });
    }
  };

  setDeleting = () => {
    if (this.#mode === Mode.EDITING) {
      this.#pointEditComponent.updateElement({
        isDisabled: true,
        isDeleting: true,
      });
    }
  };

  #setPointComponent = () => {
    this.#pointComponent = new ViewTripPoint(
      this.#point,
      this.#destinations,
      this.#offers
    );
    this.#pointComponent.setEditClickHandler(this.#handleEditClick);
  };

  #setPointEditComponent = () => {
    this.#pointEditComponent = new ViewForm(
      this.#point,
      this.#destinations,
      this.#offers,
      ViewFormType.EDIT_FORM
    );
    this.#pointEditComponent.setFormRollupHandler(this.#handleFormRollup);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setFormResetHandler(this.#handleFormReset);
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

  #handleFormSubmit = (updatedPoint) => {
    const isMinorUpdate =
      this.#point.dateFrom !== updatedPoint.dateFrom ||
      this.#point.basePrice !== updatedPoint.basePrice;
    this.#changeData(
      UserAction.UPDATE_POINT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      updatedPoint
    );
  };

  #handleFormReset = (point) => {
    this.#changeData(
      UserAction.DELETE_POINT,
      UpdateType.MINOR,
      point
    );
  };
}
