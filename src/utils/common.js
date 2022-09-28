import dayjs from 'dayjs';
export const getRandomInteger = (min, max) => {
  if (isNaN(min) || isNaN(max) || min < 0 || min >= max) {
    return false;
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
export const getRandomArrayElement = (elements) => {
  if (!Array.isArray(elements)) {
    return false;
  }
  return elements[getRandomInteger(0, elements.length - 1)];
};
export const shuffleArray = (elements) => {
  if (!Array.isArray(elements)) {
    return false;
  }
  const copiedElements = elements.slice();
  for (let i = copiedElements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copiedElements[i], copiedElements[j]] = [
      copiedElements[j],
      copiedElements[i],
    ];
  }
  return copiedElements;
};
const getRandomRgbColor = () => {
  const r = getRandomInteger(0, 255);
  const g = getRandomInteger(0, 255);
  const b = getRandomInteger(0, 255);
  return [r, g, b];
};
export const getRandomHexColor = () => {
  const [r, g, b] = getRandomRgbColor();

  const hr = r.toString(16).padStart(2, '0');
  const hg = g.toString(16).padStart(2, '0');
  const hb = b.toString(16).padStart(2, '0');

  return hr + hg + hb;
};
const getYear = () => dayjs().year();
const getRandomMonth = () => getRandomInteger(1, 12);
const getRandomDay = () => getRandomInteger(1, 31);
const getRandomHours = () => getRandomInteger(0, 23);
const getRandomMinutes = () => getRandomInteger(0, 59);
export const getRandomDateTime = () => dayjs(`${getYear()}-${getRandomMonth()}-${getRandomDay()} ${getRandomHours()}:${getRandomMinutes()}`);
