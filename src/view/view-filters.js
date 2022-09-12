import AbstractView from '../framework/view/abstract-view.js';
const createFilterTemplate = () =>
  `<form class="trip-filters" action="#" method="get">
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
export default class ViewFilters extends AbstractView {
  get template() {
    return createFilterTemplate();
  }
}
