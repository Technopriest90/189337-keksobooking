'use strict';

(function () {
  window.rentalUnits = generateRentalUnits(window.constants.AVATARS_NUMBERS, window.constants.TITLES, window.constants.TYPES, window.constants.TIMES, window.constants.FEATURES, window.constants.NUMBER_OF_RENTAL_UNIT);

  /**
   * Creates an array of rental units based on the obtained data.
   * @param {array} avatars - An array of references to avatar sellers.
   * @param {array} titles - The array of headers for the ads.
   * @param {array} types - An array of types of apartments.
   * @param {array} times - Time array entry and departure from the apartment.
   * @param {array} features - An array of additional features.
   * @param {number} number - The number of rental units.
   * @return {array} objects - Returns an array of rental units.
   */
  function generateRentalUnits(avatars, titles, types, times, features, number) {
    var objects = new Array(number);
    for (var i = 0; i < number; i++) {
      var locationX = window.util.getRandomNumber(300, 900);
      var locationY = window.util.getRandomNumber(100, 500);
      var rooms = window.util.getRandomNumber(1, 5);
      var quests = Math.floor(rooms * 1.5);
      objects[i] = {
        author: {avatar: 'img/avatars/user' + window.util.getNonrepeatingRandomValue(avatars) + '.png'},
        offer: {
          title: window.util.getNonrepeatingRandomValue(titles),
          address: locationX + ', ' + locationY,
          price: window.util.getRandomNumber(1000, 1000000),
          type: window.util.getRandomValue(types),
          rooms: rooms,
          guests: quests,
          checkin: window.util.getRandomValue(times),
          checkout: window.util.getRandomValue(times),
          features: window.util.getRandomArray(features),
          description: '',
          photos: []
        },
        location: {x: locationX, y: locationY}
      };
    }
    return objects;
  }
})();
