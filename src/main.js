import {render} from './render.js';
import NewEventButtonView from './view/new-event-button-view.js';
import FiltersView from './view/filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';
import PointsModel from './model/points-model.js';
import DestinationsModel from './model/destinations-model.js';
import OffersModel from './model/offers-model.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripHeaderElement = siteHeaderElement.querySelector('.trip-main');
const pageMainElement = document.querySelector('.page-main');
const mainContainer = pageMainElement.querySelector('.page-body__container');

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersModel = new OffersModel();

const infoPresenter = new InfoPresenter({
  infoContainer: tripHeaderElement
});

const boardPresenter = new BoardPresenter({
  boardContainer: mainContainer,
  pointsModel,
  destinationsModel,
  offersModel
});

infoPresenter.init();
render(new FiltersView(), tripHeaderElement);
render(new NewEventButtonView(), tripHeaderElement);

boardPresenter.init();
