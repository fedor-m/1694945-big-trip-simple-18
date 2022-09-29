import { getRandomDestinationID } from './destinations.js';
import { getRandomType } from '../const/types.js';
import { MIN_PRICE } from '../const/form.js';
export const generateLocalPoint = () => ({
  basePrice: MIN_PRICE,
  dateFrom: new Date().toISOString(),
  dateTo: new Date().toISOString(),
  destination: getRandomDestinationID(),
  offers: [],
  type: getRandomType(),
});
