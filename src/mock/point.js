import { getRandomInteger, getRandomArrayElement, getRandomArray } from '../utils.js';
import { TYPES } from './types.js';
import { DESTINATIONS } from './destinations.js';
import { OFFERS } from './offers.js';
const checkArray = (arr) => arr.includes(0) ? [0] : arr;
export const generatePoint = () => ({
  basePrice: getRandomInteger(1000, 2000),
  dateFrom: new Date(Date.now()).toISOString(),
  dateTo: new Date(Date.now() + (3600 * 1000 * 24) + (3600 * 1000)).toISOString(),
  destination: getRandomArrayElement(DESTINATIONS).id,
  id: getRandomInteger(1, 100),
  offers: checkArray(getRandomArray(OFFERS).map((o) => o.id)),
  type: getRandomArrayElement(TYPES)
});
