import { remove, render, replace } from '../framework/render.js';
import { UpdateType } from '../const/actions.js';
import ViewFilters from '../view/view-filters.js';

export default class FilterPresenter {
  #filtersModel = null;
  #pointsModel = null;
  #filtersContainer = null;
  #filtersComponent = null;

  constructor (filtersContainer, pointsModel, filtersModel) {
    this.#filtersContainer = filtersContainer;
    this.#filtersModel = filtersModel;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
    this.#filtersModel.addObserver(this.#handleModelEvent);
  }

  get currentFilter() {
    return this.#filtersModel.currentFilter;
  }

  init = () => {
    const prevFiltersComponent = this.#filtersComponent;

    this.#filtersComponent = new ViewFilters(this.#filtersModel.currentFilter);
    this.#filtersComponent.setFilterChangeHandler(this.#handleFiltersTypeChange);

    if (prevFiltersComponent === null) {
      render(this.#filtersComponent, this.#filtersContainer);
      return;
    }

    replace(this.#filtersComponent, prevFiltersComponent);
    remove(prevFiltersComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFiltersTypeChange = (filterType) => {
    if (this.#filtersModel.currentFilter === filterType) {
      return;
    }

    this.#filtersModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
