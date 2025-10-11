function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getBooleanType () {
  return Boolean(Math.round(Math.random()));
}

function getRandomInteger (a, b) {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

const getRandomUniqueInteger = (maxNumber) => {
  const numbers = [];
  const getUniqueNumber = () => {
    const uniqueNumber = getRandomInteger(1, maxNumber);
    if (numbers.includes(uniqueNumber)) {
      return getUniqueNumber();
    }
    numbers.push(uniqueNumber);
    return uniqueNumber;
  };
  return getUniqueNumber;
};

// function updateItem(items, update) {
//   return items.map((item) => item.id === update.id ? update : item);
// }

export {
  getRandomArrayElement,
  getBooleanType,
  getRandomUniqueInteger,
  getRandomInteger
  // updateItem
};
