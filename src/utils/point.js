import dayjs from 'dayjs';
const ESCAPE_CODE = 'Escape';
const ESC_CODE = 'Esc';
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
const searchRegExp = /[a-z-]/ig;
export const isEscKey = (key) => key === ESCAPE_CODE || key === ESC_CODE;
export const getStringWithoutSpaces = (string) => string.replaceAll(' ', '-').toLowerCase();
export const getCapitalizedString = (string) => `${string[0].toUpperCase()}${string.slice(1)}`;
export const getDateFormatBasic = (date) => dayjs(date).format('YYYY-MM-DD');
export const getDateFormatDay = (date) => dayjs(date).format('MMM D');
export const getDateFormatTime = (date) => dayjs(date).format('HH:MM');
export const getDateTimeFormatBasic = (date) => dayjs(date).format('DD/MM/YY HH:MM');
export const sortByDay = (pointA, pointB) => {
  const weight = getWeightForNullDate(pointA.dueDate, pointB.dueDate);

  return weight ?? dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));
};
export const sortByPrice = (pointA, pointB) => Number(pointA.basePrice) - Number(pointB.basePrice);
export const getNumberFromString = (string) => Number(string.replaceAll(searchRegExp, ''));
