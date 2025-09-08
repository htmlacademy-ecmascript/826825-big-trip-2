import {createElement} from '../render.js';
import {humanizeTaskDueDate, getDurationTime} from '../utils.js';
import {DateFormat} from '../const.js';

function createOffersTemplate (offers) {

  // ${Object.entries(repeating).map(([day, repeat]) => `<input
  //       class="visually-hidden card__repeat-day-input"
  //       type="checkbox"
  //       id="repeat-${day}"
  //       name="repeat"
  //       value="${day}"
  //       ${repeat ? 'checked' : ''}
  //     />
  //     <label class="card__repeat-day" for="repeat-${day}"
  //       >${day}</label
  //     >`).join('')}
  // console.log(offers);
  return offers.map((offer) => `<li
    class="event__offer">
      <span
        class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </li>`).join('');

}

function createPointTemplate(point, destinations, offers) {
  const {basePrice, dateFrom, dateTo, destination, isFavorite, type, currentOffers} = point;
  console.log(currentOffers);
  const day = humanizeTaskDueDate(dateFrom, DateFormat.DATE_DAY_FORMAT);
  const dataDay = humanizeTaskDueDate(dateFrom, DateFormat.DATE_DATA_DAY_FORMAT);
  const dateStart = humanizeTaskDueDate(dateFrom, DateFormat.DATE_PERIOD_FORMAT);
  const dateDataStart = humanizeTaskDueDate(dateFrom, DateFormat.DATE_DATA_PERIOD_FORMAT);
  const dateEnd = humanizeTaskDueDate(dateTo, DateFormat.DATE_PERIOD_FORMAT);
  const dateDataEnd = humanizeTaskDueDate(dateTo, DateFormat.DATE_DATA_PERIOD_FORMAT);

  const currentDestination = destinations.find((element) => element.id === destination);
  const currentOfferType = offers.find((offer) => offer.type === type);

  const checkedOffers = currentOfferType.offers.map((offer) => currentOffers.includes(offer.id));
  console.log(checkedOffers);
  const offersTemplate = createOffersTemplate(checkedOffers);

  const favoriteClassName = isFavorite
    ? 'event__favorite-btn--active'
    : '';

  return (
    `<li class="trip-events__item">
      <div class="event">
        <time class="event__date" datetime="${dataDay}">${day}</time>
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/taxi.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${type} ${currentDestination.name}</h3>
        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${dateDataStart}">${dateStart}</time>
            &mdash;
            <time class="event__end-time" datetime="${dateDataEnd}">${dateEnd}</time>
          </p>
          <p class="event__duration">${getDurationTime(dateFrom, dateTo)}</p>
        </div>
        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${basePrice}</span>
        </p>
        <h4 class="visually-hidden">Offers:</h4>
        <ul class="event__selected-offers">
          ${offersTemplate}
        </ul>
        <button class="event__favorite-btn ${favoriteClassName}" type="button">
          <span class="visually-hidden">Add to favorite</span>
          <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
            <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
          </svg>
        </button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
}

export default class PointEventView {
  constructor({point, destinations, offers}) {
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
  }

  getTemplate() {
    return createPointTemplate(this.point, this.destinations, this.offers);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
