import {
  getRandomInteger,
  getRandomArrayElement
} from '../utils.js';
import { TYPES } from './types.js';
import { DESTINATIONS } from './destinations.js';
import { generateOffers } from './offers.js';
export const generatePoint = () => ({
  basePrice: getRandomInteger(1000, 2000),
  dateFrom: new Date(Date.now()).toISOString(),
  dateTo: new Date(Date.now() + 3600 * 1000 * 24 + 3600 * 1000).toISOString(),
  destination: getRandomArrayElement(DESTINATIONS).id,
  id: getRandomInteger(1, 100),
  offers: generateOffers(),
  type: getRandomArrayElement(TYPES),
});
