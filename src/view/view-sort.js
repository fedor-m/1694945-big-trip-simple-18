import AbstractView from '../framework/view/abstract-view.js';
const createSortTemplate = () =>
  `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
</form>`;
export default class ViewSort extends AbstractView {
  get template() {
    return createSortTemplate();
  }
}
