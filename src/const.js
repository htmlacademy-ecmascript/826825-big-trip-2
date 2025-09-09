const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
const DESTINATION_NAMES = ['Chamonix', 'Amsterdam', 'Duesseldorf', 'London', 'Moenchengladbach', 'Ghotem', 'Liliputia'];
const MAX_PRICE = 5000;
const MIN_PRICE = 100;
const DESCRIPTION = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.';
const POINT_COUNT = 5;

const DateFormat = {
  DATE_ADD_FORMAT: 'DD/MM/YY hh:mm',
  DATE_DAY_FORMAT: 'MMM DD',
  DATE_DATA_DAY_FORMAT: 'YYYY-MM-DD',
  DATE_PERIOD_FORMAT: 'hh:mm',
  DATE_DATA_PERIOD_FORMAT: 'YYYY-ММ-DDThh:mm',
  DATE_DURATION_MINUTE_FORMAT: 'mm[M]',
  DATE_DURATION_HOUR_FORMAT: 'HH[H] mm[M]',
  DATE_DURATION_DAY_FORMAT: 'DD[D] HH[H] mm[M]'
};


export {
  POINT_TYPES,
  MAX_PRICE,
  MIN_PRICE,
  DESCRIPTION,
  DESTINATION_NAMES,
  POINT_COUNT,
  DateFormat
};
