import {FilterType} from '../const';
import {isEventExpired, isEventToCome, isEventPresent} from './date-utils.js';

const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isEventToCome(point.dateFrom)),
  [FilterType.PRESENT]: (points) => points.filter((point) => isEventPresent(point.dateFrom, point.dateTo)),
  [FilterType.PAST]: (points) => points.filter((point) => isEventExpired(point.dateTo)),
};

export {filter};
