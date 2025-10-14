import AbstractView from '../framework/view/abstract-view.js';
import {humanizeTaskDueDate} from '../utils/date-utils.js';
import {DateFormat, MAX_SHOW_DESTINATIONS} from '../const.js';

const createTitleTemplate = (points, destinations) => {
  if (points.length === 0) {
    return '';
  }

  const destinationNames = points
    .map((point) => destinations
      .find((element) => element.id === point.destination).name);

  const uniqueDestinationNames = Array.from(new Set(destinationNames));

  return uniqueDestinationNames.length <= MAX_SHOW_DESTINATIONS ?
    uniqueDestinationNames.join(' — ') :
    `${uniqueDestinationNames[0]} — ... — ${uniqueDestinationNames[uniqueDestinationNames.length - 1]}`;
};

const createDurationTemplate = (points) => {
  if (points.length === 0) {
    return '';
  }

  const sortedByTimePoints = points.sort((a, b) => new Date(a.dateFrom) - new Date(b.dateFrom));

  const startDate = humanizeTaskDueDate(sortedByTimePoints[0].dateFrom, DateFormat.DATE_TRIPS_FORMAT);
  const endDate = humanizeTaskDueDate(sortedByTimePoints[sortedByTimePoints.length - 1].dateTo, DateFormat.DATE_TRIPS_FORMAT);

  return `${startDate} - ${endDate}`;
};

function createTripInfoDestinationTemplate(points, destinations) {

  const titleTemplate = createTitleTemplate(points, destinations);
  const durationTemplate = createDurationTemplate(points);

  return (
    `<div class="trip-info__main">
      <h1 class="trip-info__title">
        ${titleTemplate}
      </h1>

      <p class="trip-info__dates">${durationTemplate}</p>
    </div>`
  );
}

export default class TripInfoDestinationView extends AbstractView {
  #points;
  #destinations;

  /**
   * @param {Points} points
   * @param {Destinations} destinations
   * */

  constructor({points, destinations}) {
    super();
    this.#points = points;
    this.#destinations = destinations;

  }

  get template() {
    return createTripInfoDestinationTemplate(this.#points, this.#destinations);
  }
}
