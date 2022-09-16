const ESCAPE_CODE = 'Escape';
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
export const isEscKey = (key) => ESCAPE_CODE.indexOf(key) > -1;
export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

