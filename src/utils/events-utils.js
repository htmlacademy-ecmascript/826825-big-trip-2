const findOfferByType = (offers, offerType) => offers.find((offer) => offer.type === offerType);

const getSelectedOffers = (offerByType, currentOffers) => offerByType.offers.filter((offer) => currentOffers.includes(offer.id));

export {
  findOfferByType,
  getSelectedOffers
};
