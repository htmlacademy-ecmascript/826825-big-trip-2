import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import {DateFormat} from '../const.js';

dayjs.extend(duration);

function humanizeTaskDueDate(dueDate, format) {
  return dueDate ? dayjs(dueDate).format(format) : '';
}

function generateRandomDate(from, to) {
  return new Date(
    from.getTime() +
      Math.random() * (to.getTime() - from.getTime()),
  ).getTime() + 1;
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

const isEventExpired = (dueDate) => dayjs().isAfter(dueDate);

const isEventToCome = (dueDate) => dayjs().isBefore(dueDate);

const isEventPresent = (dateFrom, dateTo) => dayjs()
  .isAfter(dateFrom) && dayjs().isBefore(dateTo);

export {
  humanizeTaskDueDate,
  getDurationTime,
  generateRandomDate,
  isEventExpired,
  isEventToCome,
  isEventPresent
};
