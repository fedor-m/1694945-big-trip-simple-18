import { getRandomInteger } from './utils/common.js';
import PointsModel from './model/points-model.js';
import FiltersModel from './model/filters-model.js';
import EventsPresenter from './presenter/events-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';

const MIN_POINTS = 0;
const MAX_POINTS = 10;
const tripPointsCount = getRandomInteger(MIN_POINTS, MAX_POINTS);
const tripFiltersSection = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');
const pointsModel = new PointsModel(tripPointsCount);
const filtersModel = new FiltersModel(tripPointsCount);
const filtersPresenter = new FiltersPresenter(tripFiltersSection,filtersModel);
const eventsPresenter = new EventsPresenter(tripEventsSection, pointsModel);

filtersPresenter.init();
eventsPresenter.init();
