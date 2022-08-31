import ViewFilters from './view/view-filters.js';
import ViewSort from './view/view-sort.js';
import { render } from './render.js';
import ModelPoints from './model/model-points.js';
import EventsPresenter from './presenter/events-presenter';

const TRIP_POINTS_COUNT = 3;
const tripFiltersSection = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');
const modelPoints = new ModelPoints(TRIP_POINTS_COUNT);
const presenter = new EventsPresenter(tripEventsSection, modelPoints);

render(new ViewFilters(), tripFiltersSection);
render(new ViewSort(), tripEventsSection);
presenter.init();
