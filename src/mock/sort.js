const RADIX = 10;
export const SORT_TYPES = [
  'day','event', 'time', 'price', 'offers'
];
export const SORT_TYPES_ENABLED = ['day', 'price'];
export const SORT_FUNCTIONS = {
  'day': '',
  'price': (points) => {
    points.sort((a, b) => parseInt(a.price, RADIX) - parseInt(b.price, RADIX));
  }
};
