import { shuffleArray, getRandomInteger } from '../utils/common.js';
export const OFFERS = [
  {
    type: 'flight',
    offers: [
      {
        id: 1,
        title: 'Choose seats',
        price: 5,
      },
      {
        id: 2,
        title: 'Switch to comfort',
        price: 80,
      },
      {
        id: 3,
        title: 'Add luggage',
        price: 50,
      },
      {
        id: 4,
        title: 'Add meal',
        price: 15,
      },
      {
        id: 5,
        title: 'Travel by train',
        price: 40,
      },
    ],
  },
  {
    type: 'drive',
    offers: [
      {
        id: 1,
        title: 'Rent a car',
        price: 200,
      },
    ],
  },
  {
    type: 'check-in',
    offers: [
      {
        id: 1,
        title: 'Book a suite',
        price: 300,
      },
      {
        id: 2,
        title: 'Add breakfast',
        price: 50,
      },
      {
        id: 3,
        title: 'Add supper',
        price: 50,
      },
    ],
  },
  {
    type: 'sightseeing',
    offers: [
      {
        id: 1,
        title: 'Book tickets',
        price: 40,
      },
      {
        id: 2,
        title: 'Lunch in city',
        price: 30,
      },
    ],
  },
  {
    type: 'taxi',
    offers: [
      {
        id: 1,
        title: 'Upgrade to a business class',
        price: 120,
      },
      {
        id: 2,
        title: 'Order Uber',
        price: 20,
      },
    ],
  },
  {
    type: 'restaurant',
    offers: [
      {
        id: 1,
        title: 'Choose a non-smoking section',
        price: 100,
      },
      {
        id: 2,
        title: 'Reserve outside table',
        price: 200,
      },
      {
        id: 3,
        title: 'Choose dishes from the chef',
        price: 500,
      },
    ],
  },
  {
    type: 'train',
    offers: [
      {
        id: 1,
        title: 'Choose seats',
        price: 5,
      },
      {
        id: 2,
        title: 'Choose lower berth',
        price: 30,
      },
      {
        id: 3,
        title: 'Put the luggage into a separate wagon',
        price: 100,
      },
    ],
  },
  {
    type: 'ship',
    offers: [
      {
        id: 1,
        title: 'Choose a cabin',
        price: 100,
      },
      {
        id: 2,
        title: 'Choose an upper deck',
        price: 500,
      },
    ],
  },
  {
    type: 'bus',
    offers: [],
  },
];
export const getAllOffersByType = (type) =>{
  const foundOffers = OFFERS.find((offer)=>offer.type === type);
  return foundOffers.offers;
};
export const getOffersByType = (type, offers) => {
  if (offers.length === 0) {
    return offers;
  }
  return getAllOffersByType(type).filter(
    (offer) => offers.includes(offer.id),
  );
};
export const getRandomOffersByType = (type) => {
  const allOffersByType = getAllOffersByType(type);
  return shuffleArray(allOffersByType)
    .slice(0, getRandomInteger(0, allOffersByType.length))
    .map((offer) => offer.id)
    .sort((a, b) => a - b);
};
