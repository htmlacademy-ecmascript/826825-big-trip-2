// import dayjs from 'dayjs';

const findOfferByType = (offers, offerType) => offers.find((offer) => offer.type === offerType);

const getSelectedOffers = (offerByType, currentOffers) => offerByType.offers.filter((offer) => currentOffers.includes(offer.id));

function getWeightForNullData(dataA, dataB) {
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

// function sortTaskUp(taskA, taskB) {
//   const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);
//   return weight ?? dayjs(taskA.dueDate).diff(dayjs(taskB.dueDate));
// }

function sortPointsByPrice(pointA, pointB) {
  const weight = getWeightForNullData(pointA.basePrice, pointB.basePrice);
  return weight;
}

// const sortPointsByPrice = (pionts) => pionts.sort((a, b) => a.basePrice - b.basePrice);

export {
  findOfferByType,
  getSelectedOffers,
  sortPointsByPrice
};
