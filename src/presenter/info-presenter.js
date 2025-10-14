import TripInfoView from '../view/trip-info-view.js';
import TripInfoCostView from '../view/trip-info-cost-view.js';
import TripInfoDestinationView from '../view/trip-info-destination-view.js';
import {render, replace, remove, RenderPosition} from '../framework/render.js';


/**
 * @typedef {{basePrice: number, dateFrom: number, dateTo: number, destination: number, id: number, isFavorite: boolean, offers: string[], type: string}[]} Points
 * @typedef {{description: string, id: number, name: string, pictures: {src: string, description: string}[]}[]} Destinations
 * @typedef {{type: string, id: number, offers: {id: string, title: string, price: number}[]}[]} Offers
 * */
export default class InfoPresenter {
  #infoContainer = null;
  #pointsModel = null;
  #infoComponent = new TripInfoView();
  #destinationInfoComponent = null;
  #costInfoComponent = null;
  /** @type {Points} */
  #infoPoints = [];
  /** @type {Destinations} */
  #infoDestinations = [];
  /** @type {Offers} */
  #infoOffers = [];

  /**
   * @param {Destinations} infoDestinations
   * @param {Offers} infoOffers
   * @param {Points} infoPoints
   * */

  constructor({infoContainer, pointsModel}) {
    this.#infoContainer = infoContainer;
    this.#pointsModel = pointsModel;

    this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#infoPoints = [...this.#pointsModel.points];
    this.#infoDestinations = this.#pointsModel.destinations;
    this.#infoOffers = this.#pointsModel.offers;

    const prevDestinationComponent = this.#destinationInfoComponent;
    const prevCostComponent = this.#costInfoComponent;

    render(this.#infoComponent, this.#infoContainer, RenderPosition.AFTERBEGIN);

    this.#destinationInfoComponent = new TripInfoDestinationView({
      points: this.#infoPoints,
      destinations: this.#infoDestinations
    });

    this.#costInfoComponent = new TripInfoCostView({
      points: this.#infoPoints,
      offers: this.#infoOffers
    });

    if (prevDestinationComponent === null || prevCostComponent === null) {
      render(this.#destinationInfoComponent, this.#infoComponent.element);
      render(this.#costInfoComponent, this.#infoComponent.element);
      return;
    }

    replace(this.#destinationInfoComponent, prevDestinationComponent);
    replace(this.#costInfoComponent, prevCostComponent);

    remove(prevDestinationComponent);
    remove(prevCostComponent);

  }

  #handleModelEvent = () => {
    this.init();
  };
}
