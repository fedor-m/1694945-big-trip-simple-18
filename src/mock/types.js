import { getRandomArrayElement } from '../utils/common.js';
export const TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant'
];
export const getRandomType = () => getRandomArrayElement(TYPES);
