import ViewFilters from './view/view-filters.js';
import ViewSort from './view/view-sort.js';
import ViewTripEventsList from './view/view-trip-events-list-create.js';
import ViewFormEdit from './view/view-form-edit.js';
import ViewFormCreate from './view/view-form-create.js';
import ViewTripPoint from './view/view-trip-point.js';
import {render} from './render.js';

const TRIP_POINTS_COUNT = 3;
const filterContainer = document.querySelector('.trip-controls__filters');
const sortAndContentContainer = document.querySelector('.trip-events');


render(new ViewFilters(), filterContainer);
render(new ViewSort(), sortAndContentContainer);
render(new ViewTripEventsList(), sortAndContentContainer);
const pointsContainer = document.querySelector('.trip-events__list');
render(new ViewFormEdit(), pointsContainer);
for (let i = 0; i < TRIP_POINTS_COUNT; i++) {
  render(new ViewTripPoint(), pointsContainer);
}
render(new ViewFormCreate(), pointsContainer);
