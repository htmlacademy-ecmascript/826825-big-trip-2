import {getRandomArrayElement, getRandomUniqueInteger} from '../utils.js';
import {DESCRIPTION, DESTINATION_NAMES} from '../const.js';

const generateDescription = () => {
  const descriptionTExts = Array.from(DESCRIPTION.split('. '));
  return getRandomArrayElement(descriptionTExts);
};

const getDestinationId = getRandomUniqueInteger(DESTINATION_NAMES.length - 1);

export const generateDestinations = () => {
  const destinationsId = getDestinationId();

  return ({
    id: destinationsId,
    description: generateDescription(),
    name: DESTINATION_NAMES[destinationsId - 1],
    pictures: [
      {
        src: 'img/photos/1.jpg',
        description: 'Chamonix parliament building'
      },
      {
        src: 'img/photos/2.jpg',
        description: 'Chamonix parliament building'
      },
      {
        src: 'img/photos/3.jpg',
        description: 'Chamonix parliament building'
      },
      {
        src: 'img/photos/4.jpg',
        description: 'Chamonix parliament building'
      },
      {
        src: 'img/photos/5.jpg',
        description: 'Chamonix parliament building'
      }
    ]
  });
};
