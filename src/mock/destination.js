import {getRandomUniqueInteger, getRandomArrayElement, getRandomInteger} from '../utils.js';
import {DESCRIPTION, DESTINATION_NAMES} from '../const.js';

const generateDescription = () => {
  const descriptionTExts = Array.from(DESCRIPTION.split('. '));
  return getRandomArrayElement(descriptionTExts);
};

const getDestinationId = getRandomUniqueInteger(DESTINATION_NAMES.length - 1);

export const generateDestinations = () => ({
  id: getDestinationId(),
  description: generateDescription(),
  name: getRandomArrayElement(DESTINATION_NAMES),
  pictures: [
    {
      src: `https://loremflickr.com/248/152?random=${getRandomInteger(0 , 100)}`,
      description: 'Chamonix parliament building'
    }
  ]
});
