import BoardView from '../view/bord-view.js';
import TripListView from '../view/trip-list-view.js';
import SortView from '../view/sort-view.js';
import AddPointView from '../view/add-point-view';
import PointEventView from '../view/point-event-view.js';
import {render} from '../render.js';

export default class BoardPresenter {
  boardComponent = new BoardView();
  tripListComponent = new TripListView();

  constructor({boardContainer, pointsModel, destinationsModel, offersModel}) {
    this.boardContainer = boardContainer;
    this.pointsModel = pointsModel;
    this.destinationsModel = destinationsModel;
    this.offersModel = offersModel;
  }

  init() {
    this.boardPoints = [...this.pointsModel.getPoints()];
    this.boardDestinations = [...this.destinationsModel.getDestinations()];
    this.boardOffers = [...this.offersModel.getOffers()];
    render(this.boardComponent, this.boardContainer);
    render(new SortView(), this.boardComponent.getElement());
    render(this.tripListComponent, this.boardComponent.getElement());
    render(new AddPointView({point: this.boardPoints[0], destinations: this.boardDestinations, offers: this.boardOffers}), this.tripListComponent.getElement());
    for (let i = 1; i < this.boardPoints.length; i++) {
      render(new PointEventView({point: this.boardPoints[i], destinations: this.boardDestinations, offers: this.boardOffers}), this.tripListComponent.getElement());
    }
  }
}
