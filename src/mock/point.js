import {
  getRandomInteger,
  getRandomDateTime
} from '../utils/common.js';
import { nanoid } from 'nanoid';
import { getRandomDestinationID } from './destinations.js';
import { getRandomOffersByType } from './offers.js';
import { getRandomType } from './types.js';
const MIN_PRICE = 1000;
const MAX_PRICE = 2000;
export const generatePoint = () => {
  const type = getRandomType();
  let dateFrom = getRandomDateTime();
  let dateTo = getRandomDateTime();
  if (dateFrom > dateTo) {
    [dateFrom, dateTo] = [dateTo, dateFrom];
  }
  return {
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    dateFrom: dateFrom.toISOString(),
    dateTo: dateTo.toISOString(),
    destination: getRandomDestinationID(),
    id: nanoid(),
    offers: getRandomOffersByType(type),
    type,
  };
};
