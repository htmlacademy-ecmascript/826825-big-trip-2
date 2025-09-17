import BoardView from '../view/bord-view.js';
import TripListView from '../view/trip-list-view.js';
import SortView from '../view/sort-view.js';
import AddPointView from '../view/add-point-view';
import PointEventView from '../view/point-event-view.js';
import NoPointView from '../view/no-point-view.js';
import {render, replace} from '../framework/render.js';

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

    this.#renderBoard();
  }

  #renderPoint(point, destinations, offers) {
    const escKeyDownHandler = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    const pointComponent = new PointEventView({
      point,
      destinations,
      offers,
      onEditClick: () => {
        replacePointToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    const pointEditComponent = new AddPointView({
      point,
      destinations,
      offers,
      onFormSubmit: () => {
        closeEditForm();
      },
      onCloseButtonClick: () => {
        closeEditForm();
      }
    });

    // const pointComponent = new PointEventView({point, destinations, offers});

    function replacePointToForm() {
      replace(pointEditComponent, pointComponent);
    }

    function replaceFormToPoint() {
      replace(pointComponent, pointEditComponent);
    }

    function closeEditForm() {
      replaceFormToPoint();
      document.removeEventListener('keydown', escKeyDownHandler);
    }

    render(pointComponent, this.#tripListComponent.element);
  }

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);
    render(new SortView(), this.#boardComponent.element);
    render(this.#tripListComponent, this.#boardComponent.element);
    // render(new AddPointView({point: this.#boardPoints[0], destinations: this.#boardDestinations, offers: this.#boardOffers}), this.#tripListComponent.element);
    for (let i = 0; i < this.#boardPoints.length; i++) {
      this.#renderPoint(this.#boardPoints[i], this.#boardDestinations, this.#boardOffers);
    }
  }
}
