import AbstractView from '../framework/view/abstract-view';
const createSortTypeTemplate = (type) =>
  `<div class="trip-sort__item  trip-sort__item--${ type.name }">
    <input id="sort-${ type.name }" class="trip-sort__input  visually-hidden" type="radio"   name="trip-sort" value="sort-${ type.name }" ${type.enabled ? '' : 'disabled=""'}>
    <label class="trip-sort__btn" for="sort-${type.name}">${type.name}</label>
  </div>`;
export default class ViewSortType extends AbstractView {
  #type = null;
  constructor(type) {
    super();
    this.#type = type;
  }

  get template() {
    return createSortTypeTemplate(this.#type);
  }

  setChangeHandler = (callback) => {
    this._callback.change = callback;
    this.element
      .querySelector('.trip-sort__input')
      .addEventListener('change', this.#changeHandler);
  };

  #changeHandler = (evt) => {
    evt.preventDefault();
    this._callback.change();
  };
}
