import PointsModel from './model/points-model.js';
import FiltersModel from './model/filters-model.js';
import EventsPresenter from './presenter/events-presenter.js';
import FiltersPresenter from './presenter/filters-presenter.js';

const tripFiltersSection = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const filtersModel = new FiltersModel();
const filtersPresenter = new FiltersPresenter(tripFiltersSection, pointsModel, filtersModel);
const eventsPresenter = new EventsPresenter(tripEventsSection, pointsModel, filtersModel);

filtersPresenter.init();
eventsPresenter.init();
