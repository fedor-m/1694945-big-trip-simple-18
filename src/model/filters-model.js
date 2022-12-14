import Observable from '../framework/observable.js';
import { FILTER_TYPE_DEFAULT } from '../const/filters.js';

export default class FiltersModel extends Observable {
  #currentFilter = FILTER_TYPE_DEFAULT;

  get currentFilter () {
    return this.#currentFilter;
  }

  setFilter = (updateType, filter) => {
    this.#currentFilter = filter;
    this._notify(updateType, filter);
  };
}
