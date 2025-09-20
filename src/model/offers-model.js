import {getOffers} from '../mock/offer.js';


export default class OffersModel {
  #offers = getOffers();

  get offers() {
    return this.#offers;
  }
}
