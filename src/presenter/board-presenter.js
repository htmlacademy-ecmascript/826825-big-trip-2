import BoardView from '../view/bord-view.js';
import TripListView from '../view/trip-list-view.js';
import SortView from '../view/sort-view.js';
import AddPointView from '../view/add-point-view';
import PointEventView from '../view/point-event-view.js';
import {render} from '../framework/render.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #boardComponent = new BoardView();
  #tripListComponent = new TripListView();
  #boardPoints = [];
  #boardDestinations = [];
  #boardOffers = [];

  constructor({boardContainer, pointsModel, destinationsModel, offersModel}) {
    this.#boardContainer = boardContainer;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init() {
    this.#boardPoints = [...this.#pointsModel.points];
    this.#boardDestinations = [...this.#destinationsModel.destinations];
    this.#boardOffers = [...this.#offersModel.offers];
    render(this.#boardComponent, this.#boardContainer);
    render(new SortView(), this.#boardComponent.element);
    render(this.#tripListComponent, this.#boardComponent.element);
    // render(new AddPointView({point: this.#boardPoints[0], destinations: this.#boardDestinations, offers: this.#boardOffers}), this.#tripListComponent.element);
    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i], this.#boardDestinations, this.#boardOffers);
    }
  }

  #renderPoint(point, destinations, offers) {
    const pointComponent = new PointEventView({point, destinations, offers});

    render(pointComponent, this.#tripListComponent.element);
  }
}
