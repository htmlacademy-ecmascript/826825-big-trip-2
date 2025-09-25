const findOfferByType = (offers, offerType) => offers.find((offer) => offer.type === offerType);

const getSelectedOffers = (offerByType, currentOffers) => offerByType.offers.filter((offer) => currentOffers.includes(offer.id));

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
}

function sortTaskUp(taskA, taskB) {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);
  return weight ?? dayjs(taskA.dueDate).diff(dayjs(taskB.dueDate));
}

function sortTaskDown(taskA, taskB) {
  const weight = getWeightForNullDate(taskA.dueDate, taskB.dueDate);
  return weight ?? dayjs(taskB.dueDate).diff(dayjs(taskA.dueDate));
}

export {
  findOfferByType,
  getSelectedOffers
};
