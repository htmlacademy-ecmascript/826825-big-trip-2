import TripInfoView from '../view/trip-info-view.js';
import TripInfoCostView from '../view/trip-info-cost-view.js';
import TripInfoDestinationView from '../view/trip-info-destination-view.js';
import {render} from '../framework/render.js';

export default class InfoPresenter {
  #infoContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #infoComponent = new TripInfoView();

  #infoPoints = [];
  #infoDestinations = [];
  #infoOffers = [];

  constructor({infoContainer, pointsModel, destinationsModel, offersModel}) {
    this.#infoContainer = infoContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    // this.#pointsModel.addObserver(this.#handleModelEvent);
  }

  init() {
    this.#infoPoints = [...this.#pointsModel.points];
    this.#infoDestinations = [...this.#destinationsModel.destinations];
    this.#infoOffers = [...this.#offersModel.offers];

    render(this.#infoComponent, this.#infoContainer);
    render(new TripInfoDestinationView({
      points: this.#infoPoints,
      destinations: this.#infoDestinations}), this.#infoComponent.element);
    render(new TripInfoCostView({
      points: this.#infoPoints,
      offers: this.#infoOffers}), this.#infoComponent.element);
  }

  
}
