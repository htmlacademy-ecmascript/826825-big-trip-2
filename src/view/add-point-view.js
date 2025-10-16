import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizeTaskDueDate} from '../utils/date-utils.js';
import {findOfferByType} from '../utils/events-utils.js';
import {DateFormat, BLANK_POINT, PointPrice, ValidateText} from '../const.js';
import flatpickr from 'flatpickr';
import he from 'he';
import 'flatpickr/dist/flatpickr.min.css';


function createOffersTemplate(offerByType, currentOffers) {
  if (offerByType.length === 0) {
    return '';
  }

  return (
    `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>
        <div class="event__available-offers">
          ${offerByType.offers.map((offer) =>
      `<div class="event__offer-selector">
        <input
          class="event__offer-checkbox visually-hidden"
          id="${offer.id}"
          type="checkbox"
          name="event-offer-${offer.title.split(' ')[0]}"
          data-offer-id="${offer.id}"
          ${currentOffers.includes(offer.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`).join('')
    }
        </div>
    </section>`
  );
}

function createDescriptionTemplate(currentDestination) {
  if (!currentDestination) {
    return '';
  }
  const {name, description, pictures} = currentDestination;
  return (
    `<section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">${name}</h3>
      <p class="event__destination-description">${description}</p>

      <div class="event__photos-container">
        <div class="event__photos-tape">
          ${createFotosTemplate(pictures)}
        </div>
      </div>
    </section>`
  );
}

function createFotosTemplate(pictures) {
  return pictures.map(({src, description}) => `<img
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
      data-value="${type}"
      value=${type}
      >
    <label class="event__type-label  event__type-label--${type}"
      for="event-type-${type}-1">${type.charAt(0).toUpperCase() + type.slice(1)}</label>
  </div>`).join('');
}

function createDestinationsListTemplate(destinations) {
  return destinations.map(({name}) => `<option value=${name}></option>`).join('');
}

/**
 * @param {Point} point
 * @param {Destinations} destinations
 * @param {Offers} offers
 * */

function createAddPointTemplate(point, destinations, offers, isNewPoint) {

  const {
    basePrice,
    dateFrom,
    dateTo,
    destination,
    type,
    offers: currentOffers,
    isDisabled,
    isSaving,
    isDeleting
  } = point;

  const dateStart = humanizeTaskDueDate(dateFrom, DateFormat.DATE_ADD_FORMAT);
  const dateEnd = humanizeTaskDueDate(dateTo, DateFormat.DATE_ADD_FORMAT);
  const isSubmitDisabled = (dateTo === null) || (dateFrom === null);
  const currentDestination = destinations.find((element) => element.id === destination);
  const offerByType = findOfferByType(offers, type);

  const eventsTemplate = createEventsTemplate(offers);
  const offersTemplate = createOffersTemplate(offerByType, currentOffers);
  const descriptionTemplate = createDescriptionTemplate(currentDestination);
  const destinationsListTemplate = createDestinationsListTemplate(destinations);
  const rollupButtonTemplate = `<button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`;

  return (
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type.toLowerCase()}.png" alt="Event type icon">
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
            <input class="event__input  event__input--destination"
              id="event-destination-1"
              type="text" name="event-destination"
              value="${he.encode(currentDestination ? currentDestination.name : '')}"
              list="destination-list-1">
            <datalist id="destination-list-1">
              ${destinationsListTemplate}
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateStart}">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateEnd}">
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${he.encode(basePrice.toString())}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled || isDisabled ? 'disabled' : ''}>
            ${isSaving ? 'saving...' : 'save'}
          </button>
          <button class="event__reset-btn" type="reset">${isNewPoint ? 'Cancel' : `${isDeleting ? 'deleting...' : 'delete'}`}</button>
          ${!isNewPoint ? rollupButtonTemplate : ''}
        </header>
        <section class="event__details">
            ${offersTemplate}
            ${descriptionTemplate}
        </section>
      </form>
    </li>`
  );
}

export default class AddPointView extends AbstractStatefulView {
  #destinations;
  #offers;
  #isNewPoint = false;

  #datepickerStart = null;
  #datepickerEnd = null;

  #handleCloseButtonClick;
  #handleFormSubmit;
  #handleDeleteClick;

  /**
   * @param {Point} point
   * @param {Destinations} destinations
   * @param {Offers} offers
   * @param {Function} onFormSubmit
   * @param {Function} onCloseButtonClick
   * @param {Function} onDeleteClick
   * */

  constructor({point = BLANK_POINT, destinations, offers, onFormSubmit, onCloseButtonClick, onDeleteClick, isNewPoint}) {
    super();
    this._setState(AddPointView.parsePointToState(point));
    this.#destinations = destinations;
    this.#offers = offers;
    this.#isNewPoint = isNewPoint;

    this._restoreHandlers();

    this.#handleCloseButtonClick = onCloseButtonClick;
    this.#handleFormSubmit = onFormSubmit;
    this.#handleDeleteClick = onDeleteClick;
  }

  get template() {
    return createAddPointTemplate(this._state, this.#destinations, this.#offers, this.#isNewPoint);
  }

  #setDatepickerFrom() {
    this.#datepickerStart = flatpickr(
      this.element.querySelector('#event-start-time-1'),
      {
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateFrom,
        onChange: this.#dateFromChangeHandler,
      },
    );
  }

  #setDatepickerTo() {
    this.#datepickerEnd = flatpickr(
      this.element.querySelector('#event-end-time-1'),
      {
        minDate: new Date(this._state.dateFrom),
        dateFormat: 'd/m/y H:i',
        enableTime: true,
        'time_24hr': true,
        defaultDate: this._state.dateTo,
        onChange: this.#dateToChangeHandler,
      },
    );
  }

  removeElement() {
    super.removeElement();

    if (this.#datepickerStart) {
      this.#datepickerStart.destroy();
      this.#datepickerStart = null;
    }

    if (this.#datepickerEnd) {
      this.#datepickerEnd.destroy();
      this.#datepickerEnd = null;
    }
  }

  reset(point) {
    this.updateElement(
      AddPointView.parsePointToState(point),
    );
  }

  _restoreHandlers() {
    this.element.querySelector('form').addEventListener('submit', this.#formSubmitHandler);
    this.element.querySelector('.event__rollup-btn')?.addEventListener('click', this.#closeButtonClickHandler);
    this.element.querySelector('.event__type-group').addEventListener('click', this.#eventTypeToggleHandler);
    this.element.querySelector('.event__input').addEventListener('change', this.#destinationChangeHandler);
    this.element.querySelector('.event__available-offers')?.addEventListener('change', this.#offerCurrentHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#priceChangeHandler);
    this.element.querySelector('.event__reset-btn')?.addEventListener('click', this.#formDeleteClickHandler);

    this.#setDatepickerFrom();
    this.#setDatepickerTo();
  }

  #dateFromChangeHandler = ([userDateFrom]) => {
    this.updateElement({
      dateFrom: userDateFrom,
    });
  };

  #dateToChangeHandler = ([userDateTo]) => {
    this.updateElement({
      dateTo: userDateTo,
    });
  };

  #eventTypeToggleHandler = (evt) => {
    const target = evt.target.closest('.event__type-item');

    if (!target) {
      return;
    }

    evt.preventDefault();
    this.updateElement({
      type: target.querySelector('input').dataset.value,
      offers: [],
    });
  };

  #offerCurrentHandler = (evt) => {
    evt.preventDefault();
    this.updateElement({
      offers: [...evt.currentTarget.querySelectorAll('.event__offer-checkbox:checked')].map((item) => item.dataset.offerId),
    });
  };

  #destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const curentDestination = this.#destinations.find((destination) => destination.name === evt.target.value);
    if (curentDestination) {
      this.updateElement({
        destination: curentDestination.id,
      });
    }
  };

  #priceChangeHandler = (evt) => {
    evt.preventDefault();
    const newPrice = parseInt(evt.target.value,10);
    this.updateElement({
      basePrice: newPrice > PointPrice.MIN_POINT_PRICE ? newPrice : PointPrice.MIN_POINT_PRICE,
    });
  };

  #formDeleteClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(AddPointView.parseStateToPoint(this._state));
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    const destinationInput = this.element.querySelector('.event__input--destination');
    const destinationOptions = this.#destinations.map((destination) => destination.name);
    const priceInput = this.element.querySelector('.event__input--price');

    destinationInput.setCustomValidity('');
    if (!destinationOptions.includes(destinationInput.value.trim())) {
      destinationInput.setCustomValidity(ValidateText.DESTINATIONS_NAME_FALED);
      destinationInput.reportValidity();
    }

    priceInput.setCustomValidity('');
    if (priceInput.value > PointPrice.MAX_POINT_PRICE) {
      priceInput.setCustomValidity(ValidateText.PRICE_MAX_FALED);
      priceInput.reportValidity();
    }

    if (priceInput.value < PointPrice.MIN_POINT_PRICE) {
      priceInput.setCustomValidity(ValidateText.PRICE_MIN_FALED);
      priceInput.reportValidity();
    }

    this.#handleFormSubmit(AddPointView.parseStateToPoint(this._state));
  };

  #closeButtonClickHandler = () => {
    this.#handleCloseButtonClick();
  };

  static parsePointToState(point) {
    return {...point,
      isDisabled: false,
      isSaving: false,
      isDeleting: false,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};

    delete point.isDisabled;
    delete point.isSaving;
    delete point.isDeleting;

    return point;
  }
}
