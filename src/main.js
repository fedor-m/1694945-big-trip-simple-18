import { getRandomInteger } from './utils.js';
import ViewFilters from './view/view-filters.js';
import { render } from './framework/render.js';
import PointsModel from './model/points-model.js';
import EventsPresenter from './presenter/events-presenter';

const TRIP_POINTS_COUNT = getRandomInteger(0, 10);
const tripFiltersSection = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');
const pointsModel = new PointsModel(TRIP_POINTS_COUNT);
const presenter = new EventsPresenter(tripEventsSection, pointsModel);

render(new ViewFilters(), tripFiltersSection);
presenter.init();
