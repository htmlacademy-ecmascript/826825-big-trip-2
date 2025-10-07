import {render} from './framework/render.js';
import NewEventButtonView from './view/new-event-button-view.js';
import FilterPresenter from './presenter/filter-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripHeaderElement = siteHeaderElement.querySelector('.trip-main');
const pageMainElement = document.querySelector('.page-main');
const mainContainer = pageMainElement.querySelector('.page-body__container');

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();
const filterModel = new FilterModel();

const infoPresenter = new InfoPresenter({
  infoContainer: tripHeaderElement,
  pointsModel,
  destinationsModel,
  offersModel
});

const boardPresenter = new BoardPresenter({
  boardContainer: mainContainer,
  pointsModel,
  destinationsModel,
  offersModel,
  filterModel,
  onNewPointDestroy: handleNewPointFormClose,
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripHeaderElement,
  filterModel,
  pointsModel
});

const newEventButtonComponent = new NewEventButtonView({
  onClick: handleNewPointButtonClick
});

function handleNewPointFormClose() {
  newEventButtonComponent.element.disabled = false;
}

function handleNewPointButtonClick() {
  boardPresenter.createPoint();
  newEventButtonComponent.element.disabled = true;
}

infoPresenter.init();
filterPresenter.init();
render(newEventButtonComponent, tripHeaderElement);

boardPresenter.init();
