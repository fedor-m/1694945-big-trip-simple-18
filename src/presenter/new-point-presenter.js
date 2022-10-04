import { remove, render, RenderPosition } from '../framework/render.js';
import ViewForm from '../view/view-form.js';
import { ViewFormType } from '../const/form.js';
import { isEscKey } from '../utils/utils.js';
import { UserAction, UpdateType } from '../const/actions.js';
export default class NewPointPresenter {
  #addEventComponent = null;
  #eventsListContainer = null;
  #pointsModel = null;
  #changeData = null;
  #destroyCallback = null;
  #point = null;

  constructor(eventsListContainer, pointsModel, changeData) {
    this.#eventsListContainer = eventsListContainer;
    this.#pointsModel = pointsModel;
    this.#changeData = changeData;
  }

  init = (callback, point) => {
    this.#destroyCallback = callback;
    this.#point = point;

    if (this.#addEventComponent !== null) {
      return;
    }
    this.#addEventComponent = new ViewForm(
      this.#point,
      this.#pointsModel.destinations,
      this.#pointsModel.offers,
      ViewFormType.ADD_FORM,
    );
    this.#setFormHandlers();
    render(
      this.#addEventComponent,
      this.#eventsListContainer,
      RenderPosition.AFTERBEGIN,
    );
    document.querySelector('.trip-main__event-add-btn').disabled = true;
    document.addEventListener('keydown', this.#onEscKeyDown);
  };

  destroy = () => {
    if (this.#addEventComponent === null) {
      return;
    }
    this.#destroyCallback?.();
    remove(this.#addEventComponent);
    this.#addEventComponent = null;
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #setFormHandlers = () => {
    this.#addEventComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#addEventComponent.setFormResetHandler(this.#handleFormReset);
  };

  #handleFormReset = () => {
    this.destroy();
    document.querySelector('.trip-main__event-add-btn').disabled = false;
  };

  setSaving = () => {
    this.#addEventComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  };

  setAborting = () => {
    const resetFormState = () => {
      this.#addEventComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#addEventComponent.shake(resetFormState);
  };

  #handleFormSubmit = (point) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point
    );
    document.querySelector('.trip-main__event-add-btn').disabled = false;
  };

  #onEscKeyDown = (evt) => {
    if (isEscKey(evt.key)) {
      evt.preventDefault();
      this.destroy();
      document.querySelector('.trip-main__event-add-btn').disabled = false;
    }
  };
}
