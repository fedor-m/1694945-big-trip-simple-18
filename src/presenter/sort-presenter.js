import { render } from '../framework/render.js';
import ViewSort from '../view/view-sort.js';
import ViewSortType from '../view/view-sort-type.js';

export default class SortPresenter {
  #presenterContainer;
  #model;
  #sortList = new ViewSort();
  constructor(presenterContainer, model) {
    this.#presenterContainer = presenterContainer;
    this.#model = model;
  }

  init() {
    const sortTypes = this.#model.sortTypes;
    render(this.#sortList, this.#presenterContainer);
    for (const type of sortTypes) {
      this.#renderSortType(type);
    }
  }

  #renderSortType = (type) => {
    const sortTypeComponent = new ViewSortType(type);
    sortTypeComponent.setChangeHandler(() => {});
    render(sortTypeComponent, this.#sortList.element);
  };
}
