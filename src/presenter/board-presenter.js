import {render, RenderPosition, remove} from '../framework/render.js';
import {updateItem} from '../utils/commons.js';
import {sortPointsByPrice} from '../utils/events-utils.js';
import {SortType} from '../const.js';
import BoardView from '../view/bord-view.js';
import TripListView from '../view/trip-list-view.js';
import SortView from '../view/sort-view.js';
import NoPointView from '../view/no-point-view.js';
import PointPresenter from './eventPoint-presenter.js';

export default class BoardPresenter {
  #boardContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #boardComponent = new BoardView();
  #tripListComponent = new TripListView();
  #noPointComponent = new NoPointView();
  // #sortComponent = new SortView();
  #sortComponent = null;
  #pointPresenters = new Map();
  #boardPoints = [];
  #boardDestinations = [];
  #boardOffers = [];

  #currentSortType = SortType.DAY;
  #sourcedBoardPoints = [];

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

    this.#sourcedBoardPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  }

  #renderBoard() {
    render(this.#boardComponent, this.#boardContainer);

    if (this.#boardPoints.length === 0) {
      this.#renderNoPoints();
      return;
    }

    this.#renderSort();
    this.#renderPointsList();
    // render(this.#tripListComponent, this.#boardComponent.element);
    // this.#boardPoints.forEach((point) =>
    //   this.#renderPoint(point));
  }

  #renderPointsList() {
    render(this.#tripListComponent, this.#boardComponent.element);
    this.#boardPoints.forEach((point) =>
      this.#renderPoint(point));
  }

  #sortPoints(sortType) {
    // 2. Этот исходный массив задач необходим,
    // потому что для сортировки мы будем мутировать
    // массив в свойстве _boardTasks
    switch (sortType) {
      case SortType.PRICE:
        this.#boardPoints.sort(sortPointsByPrice);
        break;
      // case SortType.DATE_DOWN:
      //   this.#boardTasks.sort(sortTaskDown);
      //   break;
      default:
        // 3. А когда пользователь захочет "вернуть всё, как было",
        // мы просто запишем в _boardTasks исходный массив
        this.#boardPoints = [...this.#sourcedBoardPoints];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortPoints(sortType);
    // - Сортируем задачи
    // - Очищаем список
    // - Рендерим список заново
    this.#clearPointsList();
    this.#renderPointsList();
  };

  #renderSort() {

    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handleSortTypeChange
    });

    render(this.#sortComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderNoPoints() {
    render(this.#noPointComponent, this.#boardComponent.element, RenderPosition.AFTERBEGIN);
  }

  #renderPoint(point) {
    const pointPresenter = new PointPresenter({
      tripListContainer: this.#tripListComponent.element,
      onDataChange: this.#handlePointChange,
      onModeChange: this.#handleModeChange,
      destinations: this.#boardDestinations,
      offers: this.#boardOffers,
    });

    pointPresenter.init(point);
    this.#pointPresenters.set(point.id, pointPresenter);
  }

  #handleModeChange = () => {
    this.#pointPresenters.forEach((presenter) => presenter.resetView());
  };

  #handlePointChange = (updatedPoint) => {
    this.#boardPoints = updateItem(this.#boardPoints, updatedPoint);
    this.#sourcedBoardPoints = updateItem(this.#sourcedBoardPoints, updatedPoint);
    this.#pointPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #clearPointsList() {
    this.#pointPresenters.forEach((presenter) => presenter.destroy());
    this.#pointPresenters.clear();
  }
}
