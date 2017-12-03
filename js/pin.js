'use strict';

(function () {
  var map = document.querySelector('.map');
  var form = document.querySelector('.notice__form');
  var pinsTemplate = document.querySelector('template').content.querySelector('.map__pin');
  var pinsPlace = map.querySelector('.map__pins');
  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');

  window.pin = {
    pinMainAddHandlers: function (element) {
      element.addEventListener('mouseup', pinMainMouseupHandler);
      element.addEventListener('keydown', pinMainPressEnterHandler);
    },
    enableDisableFieldset: enableDisableFieldset
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
    enableDisableFieldset(false);
    addPinsToMap(window.rentalUnits, pinsTemplate, pinsPlace);
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
    window.addCard(window.rentalUnits, currentAvatar, cardTemplate, pinsPlace);
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
  function enableDisableFieldset(flag) {
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
})();

