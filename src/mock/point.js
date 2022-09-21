import { getRandomInteger } from '../utils/common.js';
import { nanoid } from 'nanoid';
import { getRandomDestinationID } from './destinations.js';
import { getRandomOffersByType } from './offers.js';
import { getRandomType } from './types.js';
const MIN_PRICE = 1000;
const MAX_PRICE = 2000;
const MILLISECONDS_IN_HOUR = 3600000;
const HOURS_IN_A_DAY = 24;
export const generatePoint = () => {
  const type = getRandomType();
  return {
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    dateFrom: new Date(Date.now()).toISOString(),
    dateTo: new Date(
      Date.now() + MILLISECONDS_IN_HOUR * HOURS_IN_A_DAY + MILLISECONDS_IN_HOUR,
    ).toISOString(),
    destination: getRandomDestinationID(),
    id: nanoid(),
    offers: getRandomOffersByType(type),
    type,
  };
};
