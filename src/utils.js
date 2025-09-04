import dayjs from 'dayjs';

function humanizeTaskDueDate(dueDate, format) {
  return dueDate ? dayjs(dueDate).format(format) : '';
}

function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function getRandomNumbersArray (length, max) {
  return [...new Array(Math.round(Math.random() * length))]
    .map(() => Math.round(Math.random() * max));
}

function getBooleanType () {
  return Boolean(Math.round(Math.random()));
}

function getRandomNumber (maxNumber) {
  return Math.round(Math.random() * maxNumber);
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

export {
  humanizeTaskDueDate,
  getRandomArrayElement,
  getRandomNumbersArray,
  getBooleanType,
  getRandomNumber,
  getRandomUniqueInteger,
  getRandomInteger
};
