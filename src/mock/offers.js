export const OFFERS = [
  {
    id: 0,
    title: 'No additional offers',
  },
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
  {
    id: 3,
    title: 'Add luggage',
    price: 50,
  },
  {
    id: 4,
    title: 'Rent a car',
    price: 200,
  },
  {
    id: 5,
    title: 'Add breakfast',
    price: 50,
  },
  {
    id: 6,
    title: 'Book tickets',
    price: 40,
  },
  {
    id: 7,
    title: 'Switch to comfort',
    price: 80,
  },
  {
    id: 8,
    title: 'Lunch in city',
    price: 30,
  }
];
export const generateOffers = (type) => ({
  type,
  offers: OFFERS
});
