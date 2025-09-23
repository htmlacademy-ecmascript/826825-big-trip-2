import {getRandomArrayElement, getBooleanType, getRandomUniqueInteger, getRandomInteger} from '../utils/commons.js';
import {generateRandomDate} from '../utils/date-utils.js';
import {POINT_TYPES, MAX_PRICE, DESTINATION_NAMES, POINT_COUNT, MIN_PRICE} from '../const.js';

const getPointId = getRandomUniqueInteger(POINT_COUNT);


export const generateMockPoints = () => {
  const startDate = generateRandomDate(new Date(2025, 10, 8, 14, 30), new Date(2025, 10, 10));
  const endDate = generateRandomDate(new Date(startDate), new Date(2025, 10, 31));
  return ({
    id: getPointId(),
    basePrice: getRandomInteger(MIN_PRICE, MAX_PRICE),
    dateFrom: startDate,
    dateTo: endDate,
    destination: getRandomInteger(1, DESTINATION_NAMES.length - 1),
    isFavorite: getBooleanType(),
    offers: ['2', '4'],
    type: getRandomArrayElement(POINT_TYPES)
  });
};
