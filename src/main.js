import ViewFilters from './view/view-filters.js';
import ViewSort from './view/view-sort.js';
import { render } from './render.js';
import PointsModel from './model/points-model.js';
import EventsPresenter from './presenter/events-presenter';

const TRIP_POINTS_COUNT = 3;
const tripFiltersSection = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');
const pointsModel = new PointsModel(TRIP_POINTS_COUNT);
const presenter = new EventsPresenter(tripEventsSection, pointsModel);

render(new ViewFilters(), tripFiltersSection);
render(new ViewSort(), tripEventsSection);
presenter.init();
