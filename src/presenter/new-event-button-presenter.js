import {render} from '../framework/render.js';
import NewEventButtonView from '../view/new-event-button-view.js';

export default class NewEventButtonPresenter {
  #boardPresenter = null;
  #containerElement = null;
  #newEventButtonComponent = null;

  constructor({boardPresenter, containerElement}) {
    this.#boardPresenter = boardPresenter;
    this.#containerElement = containerElement;
  }

  #renderNewButton() {
    this.#newEventButtonComponent = new NewEventButtonView({
      onClick: this.#handleNewPointButtonClick
    });
    render(this.#newEventButtonComponent, this.#containerElement);
  }

  init() {
    this.#renderNewButton();
  }

  #handleNewPointButtonClick = () => {
    this.#boardPresenter.createPoint();
    this.#newEventButtonComponent.element.disabled = true;
  };
}
