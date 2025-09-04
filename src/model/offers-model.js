import {getOffers} from '../mock/offer.js';


export default class OffersModel {
  offers = getOffers();

  getOffers() {
    return this.offers;
  }
}
