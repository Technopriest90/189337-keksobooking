'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var form = document.querySelector('.notice__form');
  var pinsTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var pinsPlace = map.querySelector('.map__pins');
  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');

  window.pin = {

    /**
     * Adds event handlers by clicking on the main pin.
     * @param {object} element - Link to the main pin.
     */
    pinMainAddHandlers: function (element) {
      element.addEventListener('mouseup', pinMainMouseupHandler);
      element.addEventListener('keydown', pinMainPressEnterHandler);
    },

    /**
     * Adds or removes the disabled attribute from all fieldset.
     * @param {boolean} flag - If true then add disabled, if false then remove disabled.
     */
    disableFieldset: function disableFieldset(flag) {
      var fieldsSet = document.querySelectorAll('fieldset');
      for (var i = 0; i < fieldsSet.length; i++) {
        fieldsSet[i].disabled = flag;
      }
    },

    updatePins: function () {
      addPinsToMap(window.constants.RENTAL_UNITS.slice(1).sort(pinsSortingCallback).filter(pinsFilterCallback));
    }
  };

  function loadHandler(data) {
    window.constants.RENTAL_UNITS = data;
    addPinsToMap(data);
  }

  function pinsFilterCallback(rentalUnit, i, array) {
    return getWeight(array[0]) === getWeight(rentalUnit);
  }

  function pinsSortingCallback(left, right) {
    var diffRank = getWeight(right) - getWeight(left);

    return diffRank;
  }

  function getWeight(rentalUnit) {
    var weight = 0;
    var type = document.querySelector('#housing-type');
    var rooms = document.querySelector('#housing-rooms');
    var guests = document.querySelector('#housing-guests');
    var prices = document.querySelector('#housing-price');
    if (rentalUnit.offer.type === type.value) {
      weight += 1;
    }
    if (rentalUnit.offer.rooms === +rooms.value) {
      weight += 1;
    }
    if (rentalUnit.offer.guests === +guests.value) {
      weight += 1;
    }
    if (getPriceStatus(rentalUnit.offer.price, prices.value)) {
      weight += 1;
    }
    return weight;
  }

  function getPriceStatus(price, status) {
    if (status === 'low' && price < window.constants.PRICES_FILTER.low) {
      return true;
    } else if (status === 'middle' && price > window.constants.PRICES_FILTER.middle[0] && price < window.constants.PRICES_FILTER.middle[1]) {
      return true;
    } else if (status === 'high' && price > window.constants.PRICES_FILTER.high) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Render a pin.
   * @param {object} rentalUnit - Information about the rental apartment.
   * @param {object} pinTemplate - The template of pin.
   * @return {object} pin - Returns render pin.
   */
  function renderPin(rentalUnit, pinTemplate) {
    var pin = pinTemplate.cloneNode(true);
    pin.style.left = rentalUnit.location.x + 'px';
    pin.style.top = rentalUnit.location.y + 'px';
    pin.querySelector('img').setAttribute('src', rentalUnit.author.avatar);
    return pin;
  }

  /**
   * Add pins to map.
   * @param {object} rental - Information about the rental apartment.
   */
  function addPinsToMap(rental) {
    window.util.clearChildren(pinsPlace);
    pinsPlace.appendChild(mapPinMain).cloneNode(true);
    var temp = document.createDocumentFragment();
    for (var i = 0; i < rental.length; i++) {
      temp.appendChild(renderPin(rental[i], pinsTemplate));
    }
    pinsPlace.appendChild(temp);
    mapPinMain.removeEventListener('mouseup', pinMainMouseupHandler);
    mapPinMain.removeEventListener('keydown', pinMainPressEnterHandler);
    mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler);
    var mapPins = map.querySelectorAll('.map__pin');
    for (var j = 0; j < mapPins.length; j++) {
      mapPins[j].addEventListener('click', pinClickHandler);
      mapPins[j].addEventListener('keydown', pinPressEnterHandler);
    }
  }

  /**
   * The event handler removes the shadow from the map and form.
   * Activates the form. Adds pins to the map.
   * And each pin adds event handlers pinClickHandler and pinPressEnterHandler.
   */
  function pinMainMouseupHandler() {
    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
    window.pin.disableFieldset(false);
    window.backend.load(loadHandler, window.backend.errorHandler);
  }

  /**
   * The event handler runs the function clearActivePin.
   * Makes the pin active. Adds a card to pin.
   * Adds event handlers for closing the card - popupCloseClickHandler and popupClosePressEscHandler
   * @param {object} evt - the event object
   */
  function pinClickHandler(evt) {
    clearActivePin();
    evt.currentTarget.classList.add('map__pin--active');
    var locationX = parseInt(evt.currentTarget.style.left, 10);
    window.showCard(window.constants.RENTAL_UNITS, locationX, cardTemplate, pinsPlace);
    var cardClose = map.querySelector('.popup__close');
    if (cardClose) {
      cardClose.addEventListener('click', popupCloseClickHandler);
      document.addEventListener('keydown', popupClosePressEscHandler);
    }
  }

  /**
   * The event handler removes the class .map__pin--active from active pin.
   */
  function clearActivePin() {
    var activePin = map.querySelector('.map__pin--active');
    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  }

  /**
   * The event handler for the activate pin using the enter key.
   * @param {object} evt - the event object
   */
  function pinPressEnterHandler(evt) {
    window.util.isEnterPress(evt, pinClickHandler);
  }

  /**
   * The event handler for the activate main pin using the enter key.
   * @param {object} evt - the event object
   */
  function pinMainPressEnterHandler(evt) {
    window.util.isEnterPress(evt, pinMainMouseupHandler);
  }

  /**
   * The event handler for the close popup using the esc key.
   * @param {object} evt - the event object
   */
  function popupClosePressEscHandler(evt) {
    window.util.isEscPress(evt, popupCloseClickHandler);
  }

  /**
   * The event handler for the close popup using mouse click.
   */
  function popupCloseClickHandler() {
    clearActivePin();
    map.querySelector('.popup').remove();
  }

  /**
   * Event handler for moving the main pin.
   * @param {object} evt - the event object
   */
  function mapPinMainMousedownHandler(evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    document.addEventListener('mousemove', mapPinMainMousemoveHandler);
    document.addEventListener('mouseup', mapPinMainMouseupHandler);

    /**
     * Part of the main event handler which is responsible for movement.
     * @param {object} moveEvt - the event object
     */
    function mapPinMainMousemoveHandler(moveEvt) {
      moveEvt.preventDefault();

      var addressInput = document.querySelector('#address');
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      var newPosition = {
        x: mapPinMain.offsetLeft - shift.x,
        y: mapPinMain.offsetTop - shift.y
      };
      var pinCircleHeight = mapPinMain.querySelector('img').offsetHeight;
      var pinTailHeight = Math.ceil(parseFloat(window.getComputedStyle(mapPinMain, ':after').getPropertyValue('border-top-width')));
      var heightToTail = pinCircleHeight / 2 + pinTailHeight;

      xRestriction(newPosition.x);
      yRestriction(newPosition.y, heightToTail);
      addressInput.value = 'x: ' + newPosition.x + ', y: ' + (newPosition.y + heightToTail);
    }

    /**
     * The function sets limit movement of the main pin on the X-axis.
     * @param {number} positionX - Coordinate position of the pin along the X-axis.
     */
    function xRestriction(positionX) {
      var pinCircleWidth = mapPinMain.querySelector('img').offsetWidth + 20;
      var rightRestriction = 1200;
      var leftRestriction = 0;

      if (positionX < (leftRestriction + (pinCircleWidth / 2))) {
        mapPinMain.style.left = (leftRestriction + (pinCircleWidth / 2)) + 'px';
      } else if (positionX > (rightRestriction - (pinCircleWidth / 2))) {
        mapPinMain.style.left = (rightRestriction - (pinCircleWidth / 2)) + 'px';
      } else {
        mapPinMain.style.left = positionX + 'px';
      }
    }

    /**
     * The function sets limit movement of the main pin on the Y-axis.
     * @param {number} positionY - Coordinate position of the pin along the Y-axis.
     * @param {number} heightToTail - The distance between the center pin and the tip of the tail.
     */
    function yRestriction(positionY, heightToTail) {
      var upperRestriction = 200;
      var lowerRestriction = 700;

      if (positionY < (upperRestriction - heightToTail)) {
        mapPinMain.style.top = (upperRestriction - heightToTail) + 'px';
      } else if (positionY > (lowerRestriction - heightToTail)) {
        mapPinMain.style.top = (lowerRestriction - heightToTail) + 'px';
      } else {
        mapPinMain.style.top = positionY + 'px';
      }
    }

    /**
     * Part of the main event handler is responsible for the stop motion.
     * @param {object} upEvt - the event object
     */
    function mapPinMainMouseupHandler(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', mapPinMainMousemoveHandler);
      document.removeEventListener('mouseup', mapPinMainMouseupHandler);
    }
  }
})();

