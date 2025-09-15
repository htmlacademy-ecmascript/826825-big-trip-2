import TripInfoView from '../view/trip-info-view.js';
import TripInfoCostView from '../view/trip-info-cost-view.js';
import TripInfoDestinationView from '../view/trip-info-destination-view.js';
import {render} from '../framework/render.js';


export default class InfoPresenter {
  infoComponent = new TripInfoView();

  constructor({infoContainer}) {
    this.infoContainer = infoContainer;
  }

  init() {
    render(this.infoComponent, this.infoContainer);
    render(new TripInfoDestinationView(), this.infoComponent.element);
    render(new TripInfoCostView(), this.infoComponent.element);
  }
}
