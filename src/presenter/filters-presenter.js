import { render } from '../framework/render.js';
import ViewFilter from '../view/view-filter.js';
import ViewFilters from '../view/view-filters.js';

export default class FiltersPresenter {
  #presenterContainer;
  #model;
  #filtersList = new ViewFilters();
  constructor(presenterContainer, model) {
    this.#presenterContainer = presenterContainer;
    this.#model = model;
  }

  init() {
    render(this.#filtersList, this.#presenterContainer);
    const filters = this.#model.filters;
    for (const filter of filters) {
      this.#renderFilter(filter);
    }
  }

  #renderFilter = (filter) => {
    const filterComponent = new ViewFilter(filter);
    filterComponent.setChangeHandler(() => {});
    render(filterComponent, this.#filtersList.element);
  };
}
