import Observable from '../framework/observable.js';
import { FILTER_TYPE_DEFAULT } from '../mock/filters.js';

export default class FilterModel extends Observable {
  #currentFilter = FILTER_TYPE_DEFAULT;

  get currentFilter () {
    return this.#currentFilter;
  }

  setFilter = (updateType, filter) => {
    this.#currentFilter = filter;
    this._notify(updateType, filter);
  };
}
