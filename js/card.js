'use strict';

(function () {
  window.addCard = addCard;
  /**
   * Translates type rental apartments.
   * @param {string} string - Type rental apartments in English.
   * @return {string} - Returns the type of the rental apartments in the Russian language.
   */
  function translateType(string) {
    if (string === 'flat') {
      return 'Квартира';
    } else if (string === 'bungalo') {
      return 'Бунгало';
    } else if (string === 'house') {
      return 'Дом';
    } else {
      return 'undefined';
    }
  }

  /**
   * Adds to markup tags <li> with classes from array.
   * @param {array} array - Array with classes.
   * @param {object} place - Place in the markup to add tags.
   */
  function addLiFromArray(array, place) {
    for (var i = 0; i < array.length; i++) {
      var newLi = document.createElement('li');
      newLi.className = 'feature feature--' + array[i];
      place.appendChild(newLi);
    }
  }

  /**
   * Removes all children of parent in DOM.
   * @param {object} place - Parent in DOM.
   */
  function clearChildren(place) {
    while (place.children.length !== 0) {
      place.children[0].remove();
    }
  }

  /**
   * Gets a string on the number of guests and rooms for them.
   * @param {number} rooms - Number of rooms.
   * @param {number} guests - Number of guests.
   * @return {string} - Returns a string about the number of guests and rooms.
   */
  function getStringRoomsGuests(rooms, guests) {
    if (rooms === 1) {
      var wordRoom = 'комната';
    } else if (rooms > 4) {
      wordRoom = 'комнат';
    } else {
      wordRoom = 'комнаты';
    }
    var wordGuest = (guests === 1) ? 'гостя' : 'гостей';
    return rooms + ' ' + wordRoom + ' для ' + guests + ' ' + wordGuest;
  }

  /**
   * Retrieves the rendering card with the announcement of delivery of apartment.
   * @param {object} rentalUnit - Information about the rental apartment.
   * @param {object} template - Card template with information on the rental apartment.
   * @return {object} card - Returns a render card.
   */
  function renderCard(rentalUnit, template) {
    var card = template.cloneNode(true);
    card.querySelector('h3').textContent = rentalUnit.offer.title;
    card.querySelector('small').textContent = rentalUnit.offer.address;
    card.querySelector('.popup__price').textContent = rentalUnit.offer.price + ' ₽ / ночь';
    card.querySelector('h4').textContent = translateType(rentalUnit.offer.type);
    card.querySelector('h4').nextElementSibling.textContent = getStringRoomsGuests(rentalUnit.offer.rooms, rentalUnit.offer.guests);
    card.querySelector('.popup__features').previousElementSibling.textContent = 'Заезд после ' + rentalUnit.offer.checkin + ', выезд до ' + rentalUnit.offer.checkout;
    clearChildren(card.querySelector('.popup__features'));
    addLiFromArray(rentalUnit.offer.features, card.querySelector('.popup__features'));
    card.querySelector('.popup__features').nextElementSibling.textContent = rentalUnit.offer.description;
    card.querySelector('img').setAttribute('src', rentalUnit.author.avatar);
    return card;
  }

  /**
   * Adds cards with information about the rental apartment.
   * @param {object} rental - Information about the rental apartment.
   * @param {string} avatar - The link to the avatar.
   * @param {object} template - Card template with information on the rental apartment.
   * @param {object} cardPlace - Place in the markup to embed cards.
   */
  function addCard(rental, avatar, template, cardPlace) {
    if (cardPlace.querySelector('.popup')) {
      cardPlace.querySelector('.popup').remove();
    }
    for (var i = 0; i < rental.length; i++) {
      if (rental[i].author.avatar === avatar) {
        cardPlace.appendChild(renderCard(rental[i], template));
      }
    }
  }
})();


