// import {getDurationTime} from './date-utils.js'; 
import dayjs from 'dayjs';

const findOfferByType = (offers, offerType) => offers.find((offer) => offer.type === offerType);

const getSelectedOffers = (offerByType, currentOffers) => offerByType.offers.filter((offer) => currentOffers.includes(offer.id));

const getWeightForNullData = (dataA, dataB) => {
  if (dataA === null && dataB === null) {
    return 0;
  }

  if (dataA === null) {
    return 1;
  }

  if (dataB === null) {
    return -1;
  }

  return null;
}

const sortPointsByDay = (pointA, pointB) => {
  const weight = getWeightForNullData(pointA.dateFrom, pointB.dateFrom);
  return weight ?? pointA.dateFrom - pointB.dateFrom;
}

// const sortPointsByTime = (a, b) => dayjs(b.dateTo).diff(dayjs(b.dateFrom)) - dayjs(a.dateTo).diff(dayjs(a.dateFrom));

// const sortPointsByTime = (pointA, pointB) => {
//   const durationPointA = getDurationTime(pointA.dateFrom, pointA.dateTo);
//   console.log(durationPointA);
//   const durationPointB = getDurationTime(pointB.dateFrom, pointB.dateTo);
//   console.log(durationPointB);
//   const weight = getWeightForNullData(durationPointA, durationPointB);
//   return weight ?? durationPointA - durationPointB;
// }

function sortPointsByTime(pointA, pointB) {
  console.log(pointA)
  console.log(pointB)
  return (new Date(pointB.dateTo) - new Date(pointB.dateFrom)) - (new Date(pointA.dateTo) - new Date(pointA.dateFrom));
}

const sortPointsByPrice = (pointA, pointB) => {
  const weight = getWeightForNullData(pointA.basePrice, pointB.basePrice);
  return weight ?? (pointB.basePrice - pointA.basePrice);
}

// const sortPointsByPrice = (pionts) => pionts.sort((a, b) => a.basePrice - b.basePrice);

export {
  findOfferByType,
  getSelectedOffers,
  sortPointsByPrice,
  sortPointsByDay,
  sortPointsByTime
};
