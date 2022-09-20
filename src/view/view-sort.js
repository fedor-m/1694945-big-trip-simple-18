import AbstractView from '../framework/view/abstract-view.js';
import { SORT_TYPES, SortTypeEnabled, SORT_TYPE_DEFAULT } from '../mock/sort.js';
const HANDLE_TAG = 'INPUT';
const STRING_TO_REPLACE = 'sort-';
const sortTypesMarkup = SORT_TYPES.map((type) => {
  const enabled = type === Object.values(SortTypeEnabled).find((enabledType)=>enabledType === type);
  return `
    <div class="trip-sort__item  trip-sort__item--${ type }">
      <input id="sort-${ type }" class="trip-sort__input visually-hidden" type="radio" name="trip-sort" value="sort-${ type }" ${ enabled ? '' : 'disabled=""'} ${SORT_TYPE_DEFAULT === type ? 'checked' : ''}>
      <label class="trip-sort__btn" for="sort-${ type }">${ type }</label>
  </div>`;
}).join('');
const createSortTemplate = () =>
  `<form class="trip-events__trip-sort trip-sort" action="#" method="get">
    ${ sortTypesMarkup }
  </form>`;
export default class ViewSort extends AbstractView {
  get template() {
    return createSortTemplate();
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  };

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== HANDLE_TAG) {
      return;
    }
    this._callback.sortTypeChange(evt.target.value.replace(STRING_TO_REPLACE, ''));
  };
}
