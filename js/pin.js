'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var form = document.querySelector('.notice__form');
  var pinsTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var pinsPlace = map.querySelector('.map__pins');
  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');

  window.pin = {
    pinMainAddHandlers: function (element) {
      element.addEventListener('mouseup', pinMainMouseupHandler);
      element.addEventListener('keydown', pinMainPressEnterHandler);
    },
    disableFieldset: disableFieldset
  };


  /**
   * Generates a pin.
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
   * @param {object} pinTemplate - The template of pin.
   * @param {object} pinPlace - Place to add a pin.
   */
  function addPinsToMap(rental, pinTemplate, pinPlace) {
    var temp = document.createDocumentFragment();
    for (var i = 0; i < rental.length; i++) {
      temp.appendChild(renderPin(rental[i], pinTemplate));
    }
    pinPlace.appendChild(temp);
  }

  /**
   * The event handler removes the shadow from the map and form.
   * Activates the form. Adds pins to the map.
   * And each pin adds event handlers pinClickHandler and pinPressEnterHandler.
   */
  function pinMainMouseupHandler() {
    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
    disableFieldset(false);
    addPinsToMap(window.rentalUnits, pinsTemplate, pinsPlace);
    mapPinMain.removeEventListener('mouseup', pinMainMouseupHandler);
    mapPinMain.removeEventListener('keydown', pinMainPressEnterHandler);
    mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler);
    var mapPins = map.querySelectorAll('.map__pin');
    for (var i = 0; i < mapPins.length; i++) {
      mapPins[i].addEventListener('click', pinClickHandler);
      mapPins[i].addEventListener('keydown', pinPressEnterHandler);
    }
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
    var currentAvatar = evt.currentTarget.querySelector('img').getAttribute('src');
    window.showCard(window.rentalUnits, currentAvatar, cardTemplate, pinsPlace);
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
   * Adds or removes the disabled attribute from all fieldset.
   * @param {boolean} flag - If true then add disabled, if false then remove disabled.
   */
  function disableFieldset(flag) {
    var fieldsSet = document.querySelectorAll('fieldset');
    for (var i = 0; i < fieldsSet.length; i++) {
      fieldsSet[i].disabled = flag;
    }
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

