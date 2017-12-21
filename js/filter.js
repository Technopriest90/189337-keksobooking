'use strict';

(function () {
  var mapFilter = document.querySelectorAll('.map__filter');
  var mapFilterCheckbox = document.querySelectorAll('input[name=features]');
  var type = document.querySelector('#housing-type');
  var rooms = document.querySelector('#housing-rooms');
  var guests = document.querySelector('#housing-guests');
  var prices = document.querySelector('#housing-price');
  var wifi = document.querySelector('#filter-wifi');
  var dishwasher = document.querySelector('#filter-dishwasher');
  var parking = document.querySelector('#filter-parking');
  var washer = document.querySelector('#filter-washer');
  var elevator = document.querySelector('#filter-elevator');
  var conditioner = document.querySelector('#filter-conditioner');

  addEventsToFilter();

  window.filter = {
    /**
     * Function for the filter of rental units.
     * @param {object} rentalUnit - Left element of in the sorting.
     * @param {number} i - Formal parameter.
     * @param {array} array - Original array.
     * @return {bool} - Value fot filter.
     */
    pinsFilterCallback: function (rentalUnit, i, array) {
      return getWeight(array[0]) === getWeight(rentalUnit);
    },

    /**
     * The sort function of rental units.
     * @param {object} left - Left element of in the sorting.
     * @param {object} right - Right element of in the sorting.
     * @return {number} - Value fot sorting.
     */
    pinsSortingCallback: function (left, right) {
      return getWeight(right) - getWeight(left);
    }
  };

  /**
   * Adds event handlers to control buttons on filter.
   */
  function addEventsToFilter() {
    for (var i = 0; i < mapFilter.length; i++) {
      mapFilter[i].addEventListener('change', window.util.debounce(window.pin.updatePins));
    }
    for (var j = 0; j < mapFilterCheckbox.length; j++) {
      mapFilterCheckbox[j].addEventListener('change', window.util.debounce(window.pin.updatePins));
    }
  }

  /**
   * Gets the weight of rental unit.
   * @param {object} rentalUnit - Data of the rental unit.
   * @return {number} wieght - The weight of rental unit
   */
  function getWeight(rentalUnit) {
    var weight = 0;

    weight += getOfferWeight(rentalUnit.offer.type, type.value);
    weight += getOfferWeight(rentalUnit.offer.rooms, +rooms.value);
    weight += getOfferWeight(rentalUnit.offer.guests, +guests.value);

    weight += getPriceStatus(rentalUnit.offer.price, prices.value);

    weight += getOfferFeatureWeight(wifi, rentalUnit);
    weight += getOfferFeatureWeight(dishwasher, rentalUnit);
    weight += getOfferFeatureWeight(parking, rentalUnit);
    weight += getOfferFeatureWeight(washer, rentalUnit);
    weight += getOfferFeatureWeight(elevator, rentalUnit);
    weight += getOfferFeatureWeight(conditioner, rentalUnit);

    return weight;
  }

  /**
   * Gets the weight for the offer of rental unit.
   * @param {*} offer - Value of the offer of rental unit.
   * @param {*} fieldValue - The value of the field filter.
   * @return {number} - 1 or 0.
   */
  function getOfferWeight(offer, fieldValue) {
    return (offer === fieldValue) ? 1 : 0;
  }

  /**
   * Gets the weight for the feature of rental unit.
   * @param {object} field - The filter field on check features.
   * @param {object} rentalUnit - The data of the rental unit.
   * @return {number} - 1 or 0.
   */
  function getOfferFeatureWeight(field, rentalUnit) {
    return (field.checked && ~rentalUnit.offer.features.indexOf(window.constants.FEATURES[window.constants.FEATURES.indexOf(field.value)])) ? 1 : 0;
  }

  /**
   * Gets the weight for the price of rental unit.
   * @param {number} price - Price of rental unit.
   * @param {string} status - The name of the price range.
   * @return {number} - 1 or 0.
   */
  function getPriceStatus(price, status) {
    if (status === 'low' && price < window.constants.PRICES_FILTER.low) {
      return 1;
    } else if (status === 'middle' && price > window.constants.PRICES_FILTER.middle[0] && price < window.constants.PRICES_FILTER.middle[1]) {
      return 1;
    } else if (status === 'high' && price > window.constants.PRICES_FILTER.high) {
      return 1;
    } else {
      return 0;
    }
  }
})();
