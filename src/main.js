import ViewFilters from './view/view-filters.js';
import ViewSort from './view/view-sort.js';
import { render } from './render.js';
import Presenter from './presenter/presenter.js';

const tripFiltersSection = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');
const presenter = new Presenter(tripEventsSection);

render(new ViewFilters(), tripFiltersSection);
render(new ViewSort(), tripEventsSection);
presenter.init();
