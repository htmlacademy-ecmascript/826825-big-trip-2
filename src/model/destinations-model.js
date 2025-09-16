import {generateDestinations} from '../mock/destination.js';
import {DESTINATION_NAMES} from '../const.js';


export default class DestinationsModel {
  #destinations = Array.from({length: DESTINATION_NAMES.length - 1}, generateDestinations);

  get destinations() {
    return this.#destinations;
  }
}
