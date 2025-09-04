import {getRandomArrayElement, getBooleanType, getRandomNumbersArray, getRandomNumber, getRandomUniqueInteger, getRandomInteger} from '../utils.js';
import {POINT_TYPES, MAX_PRICE, DESTINATION_NAMES, POINT_COUNT} from '../const.js';

const getPointId = getRandomUniqueInteger(POINT_COUNT);

export const generateMockPoints = () => ({
  id: getPointId(),
  basePrice: getRandomNumber(MAX_PRICE),
  dateFrom: new Date('2019-03-10T20:55:56.845Z'),
  dateTo: new Date('2019-07-10T22:55:56.845Z'),
  destination: getRandomInteger(1, DESTINATION_NAMES.length - 1),
  isFavorite: getBooleanType(),
  offers: getRandomNumbersArray(5, 5),
  type: getRandomArrayElement(POINT_TYPES)
});
