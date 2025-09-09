import {createElement} from '../render.js';

const BLANK_POINT = {
  id: '',
  basePrice: '',
  dateFrom: null,
  dateTo: null,
  destination: '',
  isFavorite: false,
  offers: [],
  type: ''
};

function createOffersTemplate(offerByType, currentOffers) {
  return offerByType.offers.map((offer) => `<div class="event__offer-selector">
          <input
            class="event__offer-checkbox visually-hidden"
            id="event-offer-luggage-1"
            type="checkbox"
            name="event-offer-luggage"
            ${currentOffers.includes(offer.id) ? 'checked' : ''}>
          <label class="event__offer-label" for="event-offer-luggage-1">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
          </label>
        </div>`).join('')
}

function createFotosTemplate(currentDestination) {
  return currentDestination.pictures.map(({src, description}) => `<img
    class="event__photo"
    src="${src}"
    alt="${description}">`).join('');
}

function createEventsTemplate(offers) {
  return offers.map(({type}) => `<div class="event__type-item">
    <input id="event-type-${type}-1"
      class="event__type-input visually-hidden"
      type="radio"
      name="event-type"
      value=${type}>
    <label class="event__type-label  event__type-label--${type}"
      for="event-type-${type}-1">${type}</label>
  </div>`).join('');
}

function createAddPointTemplate(point, destinations, offers) {
  const {basePrice, dateFrom, dateTo, destination, type, offers: currentOffers} = point;
  const currentDestination = destinations.find((element) => element.id === destination);
  const offerByType = offers.find((offer) => offer.type === type);

  const eventsTemplate = createEventsTemplate(offers);
  const offersTemplate = createOffersTemplate(offerByType, currentOffers);
  const fotosTemplate = createFotosTemplate(currentDestination);
  return (
    `<form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
                ${eventsTemplate}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${currentDestination.name} list="destination-list-1">
          <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFrom}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateTo}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${offersTemplate}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">${currentDestination.name}</h3>
          <p class="event__destination-description">${currentDestination.description}</p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${fotosTemplate}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
}

export default class AddPointView {
  constructor({point = BLANK_POINT, destinations, offers}) {
    this.point = point;
    this.destinations = destinations;
    this.offers = offers;
  }


  getTemplate() {
    return createAddPointTemplate(this.point, this.destinations, this.offers);
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
