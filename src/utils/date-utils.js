import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {DateFormat} from '../const.js';

dayjs.extend(duration);

function humanizeTaskDueDate(dueDate, format) {
  return dueDate ? dayjs(dueDate).format(format) : '';
}

const getDurationTime = (dateFrom, dateTo) => {
  const date1 = dayjs(dateFrom);
  const date2 = dayjs(dateTo);
  const datesDifference = date2.diff(date1);
  const durationObject = dayjs.duration(datesDifference);

  // const timeDuration = dayjs.duration(dayjs(dateTo).diff(dayjs(dateFrom)));
  if (durationObject.asHours() < 1) {
    return durationObject.format(DateFormat.DATE_DURATION_MINUTE_FORMAT);
  }
  if (durationObject.asDays() < 1) {
    return durationObject.format(DateFormat.DATE_DURATION_HOUR_FORMAT);
  }

  // return durationObject.format(DateFormat.DATE_DURATION_DAY_FORMAT);
  return `${Math.trunc(durationObject.asDays()).toString().padStart(2, '0') }D ${durationObject.format(DateFormat.DATE_DURATION_HOUR_FORMAT)}`;
};

const isEventExpired = (dueDate) => dayjs().isAfter(dueDate);

const isEventToCome = (dueDate) => dayjs().isBefore(dueDate);

const isEventPresent = (dateFrom, dateTo) => dayjs()
  .isAfter(dateFrom) && dayjs().isBefore(dateTo);

const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) || dayjs(dateA).isSame(dateB, 'D');


export {
  humanizeTaskDueDate,
  getDurationTime,
  isEventExpired,
  isEventToCome,
  isEventPresent,
  isDatesEqual,
};
