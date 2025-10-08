import Observable from '../framework/observable.js';
import {generateMockPoints} from '../mock/point.js';
import {POINT_COUNT} from '../const.js';
import DestinationsModel from './destinations-model.js';
import OffersModel from './offers-model.js';


export default class PointsModel extends Observable {
  #points = Array.from({length: POINT_COUNT}, generateMockPoints);
  #destinationsModel = new DestinationsModel();
  #offersModel = new OffersModel();

  get offers() {
    return [...this.#offersModel.offers];
  }

  get destinations() {
    return [...this.#destinationsModel.destinations];
  }

  get points() {
    return this.#points;
  }

  updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      update,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this.#points = [
      update,
      ...this.#points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {

    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
