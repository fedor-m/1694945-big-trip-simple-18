import AbstractView from '../framework/view/abstract-view.js';
const createFilterItemTemplate = (filter) => (
  `<div class="trip-filters__filter">
    <input id="filter-${ filter.name }" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${ filter.name }" ${filter.enabled ? '' : 'disabled'} ${ filter.checked ? 'checked' : '' }>
    <label class="trip-filters__filter-label" for="filter-${ filter.name }">${ filter.name }</label>
  </div>`
);
export default class ViewFilter extends AbstractView {
  #filter = null;
  constructor(filter) {
    super();
    this.#filter = filter;
  }

  get template() {
    return createFilterItemTemplate(this.#filter);
  }

  setChangeHandler = (callback) => {
    this._callback.change = callback;
    this.element
      .querySelector('.trip-filters__filter-input')
      .addEventListener('change', this.#changeHandler);
  };

  #changeHandler = (evt) => {
    evt.preventDefault();
    this._callback.change();
  };
}
