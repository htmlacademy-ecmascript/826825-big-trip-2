import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {DateFormat} from './const.js';

dayjs.extend(duration);

function humanizeTaskDueDate(dueDate, format) {
  return dueDate ? dayjs(dueDate).format(format) : '';
}

function generateRandomDate(from, to) {
  return new Date(
    from.getTime() +
      Math.random() * (to.getTime() - from.getTime()),
  );
}

const getDurationTime = (dateFrom, dateTo) => {
  const date1 = dayjs(dateFrom);
  const date2 = dayjs(dateTo);
  const datesDifference = date2.diff(date1);
  const durationObject = dayjs.duration(datesDifference);
  if (durationObject.asHours() < 1) {
    return durationObject.format(DateFormat.DATE_DURATION_MINUTE_FORMAT);
  }
  if (durationObject.asDays() < 1) {
    return durationObject.format(DateFormat.DATE_DURATION_HOUR_FORMAT);
  }
  return durationObject.format(DateFormat.DATE_DURATION_DAY_FORMAT);
};



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
  getDurationTime,
  generateRandomDate,
  getRandomArrayElement,
  getRandomNumbersArray,
  getBooleanType,
  getRandomUniqueInteger,
  getRandomInteger
};
