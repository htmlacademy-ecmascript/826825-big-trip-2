import AbstractView from '../framework/view/abstract-view.js';

const createCostTemplate = (points, offers) => {

  return points.reduce((total, point) => {

    const offerByType = offers.find((offer) => offer.type === point.type);
    const selectedOffers = offerByType.offers.filter((offer) => point.offers.includes(offer.id));
    const offersCost = selectedOffers.reduce((sum, offer) => sum + offer.price, 0);

    return total + point.basePrice + offersCost;
  }, 0);
};

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
