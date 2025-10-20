import {remove, render, RenderPosition} from '../framework/render.js';
import AddPointView from '../view/add-point-view';
import {UserAction, UpdateType} from '../const.js';

/**
 * @typedef {{basePrice: number, dateFrom: number, dateTo: number, destination: number, id: number, isFavorite: boolean, offers: string[], type: string}} Point
 * @typedef {{description: string, id: number, name: string, pictures: {src: string, description: string}[]}[]} Destinations
 * @typedef {{type: string, id: number, offers: {id: string, title: string, price: number}[]}[]} Offers
 * */

export default class NewPointPresenter {
  #pointEditComponent = null;
  #tripListContainer = null;
  /** @type {(point: Point) => void} */
  #handleDataChange;
  #handleDestroy;
  // #handleDestroy;
  /** @type {Destinations} */
  #destinations;
  /** @type {Offers} */
  #offers;

  /**
   * @param {(point: Point) => void} onDataChange
   * @param {Function} onDestroy
   * @param {Function} onModeChange
   * @param {Destinations} destinations
   * @param {Offers} offers
   * */

  constructor({tripListContainer, onDataChange, handleDestroy, destinations, offers}) {
    this.#tripListContainer = tripListContainer;
    this.#handleDataChange = onDataChange;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleDestroy = handleDestroy;
  }


  init() {
    if (this.#pointEditComponent !== null) {
      return;
    }

    this.#pointEditComponent = new AddPointView({
      destinations: this.#destinations,
      offers: this.#offers,
      onFormSubmit: this.#handleFormSubmit,
      onDeleteClick: this.#handleDeleteClick,
      isNewPoint: true,
    });

    render(this.#pointEditComponent, this.#tripListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#pointEditComponent === null) {
      return;
    }

    this.#handleDestroy();
    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  setSaving() {
    this.#pointEditComponent.updateElement({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this.#pointEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };
    this.#pointEditComponent.shake(resetFormState);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      point,
    );
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}
