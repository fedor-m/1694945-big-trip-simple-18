import AbstractView from '../framework/view/abstract-view.js';

const createLoadTemplate = () => '<p class="trip-events__msg">Loading...</p>';
export default class ViewLoading extends AbstractView {
  get template() {
    return createLoadTemplate();
  }
}
