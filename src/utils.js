export const getRandomInteger = (min, max) => {
  if (isNaN(min) || isNaN(max) || min < 0 || min >= max) { return false; }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const getRandomArrayElement = (arr) => arr[getRandomInteger(0, arr.length - 1)];
export const getRandomArray = (arr) => {
  const randomArray = [];
  const count = getRandomInteger(1, arr.length);
  const arrLength = arr.length;
  while (randomArray.length < count ) {
    const index = getRandomInteger(0, arrLength - 1);
    const element = arr[index];
    if (!randomArray.includes(element)) {
      randomArray.push(element);
    }
  }
  return randomArray;
};
