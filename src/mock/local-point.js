import { getRandomInteger } from '../utils/common.js';
import { nanoid } from 'nanoid';
import { getRandomDestinationID } from './destinations.js';
import { getRandomType } from '../const/types.js';
const MIN_PRICE = 1000;
const MAX_PRICE = 2000;
export const generateLocalPoint = () => ({
  basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  destination: getRandomDestinationID(),
  id: nanoid(),
  offers: [],
  type: getRandomType(),
});
