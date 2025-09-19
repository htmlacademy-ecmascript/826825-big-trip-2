const findOfferByType = (offers, offerType) => {
    return offers.find((offer) => offer.type === offerType);
}

const getSelectedOffers = (offerByType, point) => {
    return offerByType.offers.filter((offer) => point.offers.includes(offer.id));
}

export {
    findOfferByType,
    getSelectedOffers
}
