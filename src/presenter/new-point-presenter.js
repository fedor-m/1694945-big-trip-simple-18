import { remove, render, RenderPosition } from '../framework/render.js';
import ViewForm from '../view/view-form.js';
import { ViewFormType } from '../const/form.js';
import { isEscKey } from '../utils/point.js';
import { UserAction, UpdateType } from '../const/actions.js';
import { nanoid } from 'nanoid';
export default class NewPointPresenter {
  #addEventComponent = null;
  #changeData = null;
  #eventsListContainer = null;
  #destroyCallback = null;
  #point = null;

  constructor(eventsListContainer, changeData) {
    this.#eventsListContainer = eventsListContainer;
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
      ViewFormType.ADD_FORM,
    );
    this.#addEventComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#addEventComponent.setFormResetHandler(this.#handleFormReset);
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

  #handleFormReset = () => {
    this.destroy();
    document.querySelector('.trip-main__event-add-btn').disabled = false;
  };

  #handleFormSubmit = (point) => {
    this.#changeData(UserAction.ADD_POINT, UpdateType.MINOR, {
      id: nanoid(),
      ...point,
    });
    this.destroy();
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