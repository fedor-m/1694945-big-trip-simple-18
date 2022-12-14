import PointsModel from './model/points-model.js';
import FiltersModel from './model/filters-model.js';
import EventsPresenter from './presenter/events-presenter.js';
import { generateRandomString } from './utils/utils.js';
import PointsApiService from './api/points-api-service.js';

const AUTHORIZATION = `Basic ${generateRandomString()}`;
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const tripFiltersSection = document.querySelector('.trip-controls__filters');
const tripEventsSection = document.querySelector('.trip-events');
const pointsModel = new PointsModel(new PointsApiService(END_POINT, AUTHORIZATION));
const filtersModel = new FiltersModel();
const eventsPresenter = new EventsPresenter(
  tripEventsSection,
  pointsModel,
  filtersModel,
  tripFiltersSection
);

eventsPresenter.init();
pointsModel.init();
