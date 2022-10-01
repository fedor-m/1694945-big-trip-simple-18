export const getRandomInteger = (min, max) => {
  if (isNaN(min) || isNaN(max) || min < 0 || min >= max) {
    return false;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const generateRandomString = () => {
  const length = getRandomInteger(10, 15);
  return Math.random().toString(36).substring(2, length);
};
