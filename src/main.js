import NewEventButtonView from './view/new-event-button-view.js';
import FiltersView from './view/filters-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import InfoPresenter from './presenter/info-presenter.js';
import {render} from './render.js';

const siteHeaderElement = document.querySelector('.page-header');
const tripHeaderElement = siteHeaderElement.querySelector('.trip-main');
const pageMainElement = document.querySelector('.page-main');
const mainContainer = pageMainElement.querySelector('.page-body__container');

const infoPresenter = new InfoPresenter({infoContainer: tripHeaderElement});
const boardPresenter = new BoardPresenter({boardContainer: mainContainer});

infoPresenter.init();
render(new FiltersView(), tripHeaderElement);
render(new NewEventButtonView(), tripHeaderElement);

boardPresenter.init();
