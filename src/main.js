import ViewFilters from './view/view-filters.js';
import ViewSort from './view/view-sort.js';
import ViewTripEventsList from './view/view-trip-events-list-create.js';
import ViewFormCreate from './view/view-form-create.js';
import { render } from './render.js';
import Presenter from './presenter/presenter.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const sortAndContentContainer = document.querySelector('.trip-events');
const presenter = new Presenter();

render(new ViewFilters(), filterContainer);
render(new ViewSort(), sortAndContentContainer);
render(new ViewTripEventsList(), sortAndContentContainer);
const pointsContainer = document.querySelector('.trip-events__list');
presenter.init(pointsContainer);
render(new ViewFormCreate(), pointsContainer);
