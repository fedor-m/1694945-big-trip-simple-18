import { getRandomInteger } from './utils.js';
import PointsModel from './model/points-model.js';
import FiltersModel from './model/filters-model.js';
import EventsPresenter from './presenter/events-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';

const TRIP_POINTS_COUNT = getRandomInteger(0, 10);
const tripFiltersSection = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');
const pointsModel = new PointsModel(TRIP_POINTS_COUNT);
const filtersModel = new FiltersModel(TRIP_POINTS_COUNT);
const filtersPresenter = new FiltersPresenter(tripFiltersSection,filtersModel);
const eventsPresenter = new EventsPresenter(tripEventsSection, pointsModel);


filtersPresenter.init();
eventsPresenter.init();
