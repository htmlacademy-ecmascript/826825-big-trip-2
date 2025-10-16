import FilterPresenter from './presenter/filter-presenter.js';
import BoardPresenter from './presenter/board-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';
import NewEventButtonPresenter from './presenter/new-event-button-presenter.js';
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
});

const filterPresenter = new FilterPresenter({
  filterContainer: tripHeaderElement,
  filterModel,
  pointsModel
});

const newEventButtonPresenter = new NewEventButtonPresenter({
  boardPresenter,
  containerElement: tripHeaderElement
});


infoPresenter.init();
filterPresenter.init();


boardPresenter.init();
pointsModel.init()
  .finally(() => {
    newEventButtonPresenter.init();
  });
