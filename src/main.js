import ViewFilters from './view/view-filters.js';
import ViewSort from './view/view-sort.js';
import { render } from './render.js';
import Presenter from './presenter/presenter.js';

const tripFilters = document.querySelector('.trip-controls__filters');
const tripEvents = document.querySelector('.trip-events');
const presenter = new Presenter(tripEvents);

render(new ViewFilters(), tripFilters);
render(new ViewSort(), tripEvents);
presenter.init();
