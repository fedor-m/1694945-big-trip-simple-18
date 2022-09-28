import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../mock/filters.js';
const createFiltersTemplate = (filter) => {
  const filterTypesMarkup = Object.values(FilterType).map((type) => {
    const enabled = type === filter;
    return `<div class="trip-filters__filter">
      <input id="filter-${ type }" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${ type }" ${ enabled ? 'checked' : '' }>
      <label class="trip-filters__filter-label" for="filter-${ type }">${ type }</label>
    </div>`;
  }).join('');
  return `<form class="trip-filters" action="#" method="get">
    ${filterTypesMarkup}
    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>`;
};
export default class ViewFilters extends AbstractView {
  #currentFilter = null;

  constructor (currentFilter) {
    super();
    this.#currentFilter = currentFilter;
  }

  get template() {
    return createFiltersTemplate(this.#currentFilter);
  }

  setFilterChangeHandler = (callback) => {
    this._callback.changeFilter = callback;
    this.element.addEventListener('change', this.#filterChangeHandler);
  };

  #filterChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.changeFilter(evt.target.value);
  };
}
