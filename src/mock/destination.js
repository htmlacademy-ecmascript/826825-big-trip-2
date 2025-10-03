import {getRandomArrayElement, getRandomUniqueInteger, getRandomInteger} from '../utils/commons.js';
import {DESCRIPTION, DESTINATION_NAMES} from '../const.js';

const getDestinationId = getRandomUniqueInteger(DESTINATION_NAMES.length - 1);

export const generateDestinations = () => {
  const destinationsId = getDestinationId();

  return ({
    id: destinationsId,
    description: getRandomArrayElement(DESCRIPTION),
    name: DESTINATION_NAMES[destinationsId - 1],
    pictures: [
      {
        src: `https://api.dicebear.com/9.x/bottts/svg?seed=${getRandomInteger(1, 100)}`,
        description: 'Chamonix parliament building'
      },
      {
        src: `https://api.dicebear.com/9.x/bottts/svg?seed=${getRandomInteger(1, 100)}`,
        description: 'Chamonix parliament building'
      },
      {
        src: `https://api.dicebear.com/9.x/bottts/svg?seed=${getRandomInteger(1, 100)}`,
        description: 'Chamonix parliament building'
      },
      {
        src: `https://api.dicebear.com/9.x/bottts/svg?seed=${getRandomInteger(1, 100)}`,
        description: 'Chamonix parliament building'
      },
      {
        src: `https://api.dicebear.com/9.x/bottts/svg?seed=${getRandomInteger(1, 100)}`,
        description: 'Chamonix parliament building'
      }
    ]
  });
};
