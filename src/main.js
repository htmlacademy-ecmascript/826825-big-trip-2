import {render} from './framework/render.js';
import NewEventButtonView from './view/new-event-button-view.js';
import FilterPresenter from './presenter/filter-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';
import PointsModel from './model/points-model.js';
import FilterModel from './model/filter-model.js';
import PointsApiService from './points-api-service';

const AUTHORIZATION = 'Basic cNunTvZcrYNgGgm';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const siteHeaderElement = document.querySelector('.page-header');
const tripHeaderElement = siteHeaderElement.querySelector('.trip-main');
const pageMainElement = document.querySelector('.page-main');
const mainContainer = pageMainElement.querySelector('.page-body__container');

const pointsModel = new PointsModel({
  pointsApiService: new PointsApiService(END_POINT, AUTHORIZATION)
});

const filterModel = new FilterModel();

const infoPresenter = new InfoPresenter({
  infoContainer: tripHeaderElement,
  pointsModel,
  filterModel,
});

const boardPresenter = new BoardPresenter({
  boardContainer: mainContainer,
  pointsModel,
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


boardPresenter.init();
pointsModel.init()
  .finally(() => {
    render(newEventButtonComponent, tripHeaderElement);
  });
