import AbstractView from '../framework/view/abstract-view.js';
import {findOfferByType, getSelectedOffers} from '../utils/events-utils.js';

const createCostTemplate = (points, offers) => points.reduce((totalSum, point) => {

  const offerByType = findOfferByType(offers, point.type);
  const selectedOffers = getSelectedOffers(offerByType, point.offers);
  const offersCost = selectedOffers.reduce((sum, offer) => sum + offer.price, 0);

  return totalSum + point.basePrice + offersCost;
}, 0);

function createTripInfoCostTemplate(points, offers) {
  const costTemplate = createCostTemplate(points, offers);
  return (
    `<p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${costTemplate}</span>
    </p>`
  );
}

export default class TripInfoCostView extends AbstractView {
  #points = null;
  #offers = null;

  constructor({points, offers}) {
    super();
    this.#points = points;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoCostTemplate(this.#points, this.#offers);
  }
}
