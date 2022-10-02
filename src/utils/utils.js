import { FilterType } from '../const/filters.js';
import dayjs from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(isSameOrAfter);

const ESCAPE_CODE = 'Escape';
const ESC_CODE = 'Esc';
const MIN_STR_LENGTH = 10;
const MAX_STR_LENGTH = 15;
const RADIX = 36;
const BEGINNING_SYMBOL_INDEX = 2;
const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }
  if (dateA === null) {
    return 1;
  }
  if (dateB === null) {
    return -1;
  }

  return null;
};

export const getRandomInteger = (min, max) => {
  if (isNaN(min) || isNaN(max) || min < 0 || min >= max) {
    return false;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const generateRandomString = () => {
  const length = getRandomInteger(MIN_STR_LENGTH, MAX_STR_LENGTH);
  return Math.random().toString(RADIX).substring(BEGINNING_SYMBOL_INDEX, length);
};
export const isEscKey = (key) => key === ESCAPE_CODE || key === ESC_CODE;
export const getStringWithoutSpaces = (string) =>
  string.replaceAll(' ', '-').toLowerCase();
export const getCapitalizedString = (string) =>
  `${string[0].toUpperCase()}${string.slice(1)}`;
export const getDateFormatBasic = (date) => dayjs(date).format('YYYY-MM-DD');
export const getDateFormatDay = (date) => dayjs(date).format('MMM D');
export const getDateFormatTime = (date) => dayjs(date).format('HH:mm');
export const getDateTimeFormatBasic = (date) =>
  dayjs(date).format('DD/MM/YY HH:mm');
export const formatDateToISOString = (date) => dayjs(date).toISOString();
export const sortByDay = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dueDate, pointB.dueDate);
  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};
export const sortByPrice = (pointA, pointB) =>
  Number(pointA.basePrice) - Number(pointB.basePrice);
const isPointSameOrAfterToday = (point) =>
  dayjs(getDateFormatBasic(point.dateFrom)).isSameOrAfter(
    getDateFormatBasic(dayjs(new Date())),
  );
const isPointEarlierTodayButLonger = (point) =>
  dayjs(getDateFormatBasic(point.dateTo)).isAfter(
    getDateFormatBasic(dayjs(new Date())),
  );
export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) =>
    points.filter(
      (point) =>
        isPointSameOrAfterToday(point) || isPointEarlierTodayButLonger(point),
    ),
};
export const findDestinationByID = (destinations, id) =>
  destinations.find((destination) => destination.id === id);
export const findDestinationByName = (destinations, name) =>
  destinations.find((destination) => destination.name === name);
export const getEventTypes = (offers) => offers.map((offer) => offer.type);
export const findOffersByType = (offers, type) => {
  const offersByType = offers.find((offer) => offer.type === type);
  return offersByType ? offersByType.offers : [];
};
export const findOffersPointSelected = (offers, offersPoint) =>
  offers.filter((offer) => offersPoint.find((id) => offer.id === id));
export const isDatesSame = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');
