'use strict';

var AVATARS_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var TYPES = ['flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var NUMBER_OF_RENTAL_UNIT = 8;
var map = document.querySelector('.map');
var pinsTemplate = document.querySelector('template').content.querySelector('.map__pin');
var pinsPlace = map.querySelector('.map__pins');
var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
var rentalUnits = generateRentalUnits(AVATARS_NUMBERS, TITLES, TYPES, TIMES, FEATURES, NUMBER_OF_RENTAL_UNIT);

/**
 * Gets a random nonreapeating element from an array
 * @param {array} array - Group of elements to produce a random from them.
 * @return {string} - Returns a random nonreapeating element of the array.
 */
function getNonrepeatingRandomValue(array) {
  return array.splice(Math.floor(Math.random() * array.length), 1);
}

/**
 * Gets a random element from an array
 * @param {array} array - Group of elements to produce a random from them.
 * @return {string} - Returns a random element of the array.
 */
function getRandomValue(array) {
  return array[Math.floor(Math.random() * array.length)];
}

/**
 * Gets a random number from the range includes extreme values
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @return {string} - Returns a random number from range.
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Gets a random subarray from an array.
 * @param {array} array - Group of elements to extract the subarray.
 * @return {array} newArr - Returns a random subarray.
 */
function getRandomArray(array) {
  var newArr = new Array(getRandomNumber(1, array.length));
  var temp = array.slice();
  for (var i = 0; i < newArr.length; i++) {
    newArr[i] = getNonrepeatingRandomValue(temp);
  }
  return newArr;
}

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
    var locationX = getRandomNumber(300, 900);
    var locationY = getRandomNumber(100, 500);
    var rooms = getRandomNumber(1, 5);
    var quests = Math.floor(rooms * 1.5);
    objects[i] = {
      author: {avatar: 'img/avatars/user' + getNonrepeatingRandomValue(avatars) + '.png'},
      offer: {
        title: getNonrepeatingRandomValue(titles),
        address: locationX + ', ' + locationY,
        price: getRandomNumber(1000, 1000000),
        type: getRandomValue(types),
        rooms: rooms,
        guests: quests,
        checkin: getRandomValue(times),
        checkout: getRandomValue(times),
        features: getRandomArray(features),
        description: '',
        photos: []
      },
      location: {x: locationX, y: locationY}
    };
  }
  return objects;
}

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

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var mapPinMain = map.querySelector('.map__pin--main');
var form = document.querySelector('.notice__form');

enableDisableFieldset(true);
mapPinMain.addEventListener('mouseup', pinMainMouseupHandler);
mapPinMain.addEventListener('keydown', pinMainPressEnterHandler);

/**
 * The event handler removes the shadow from the map and form.
 * Activates the form. Adds pins to the map.
 * And each pin adds event handlers pinClickHandler and pinPressEnterHandler.
 */
function pinMainMouseupHandler() {
  map.classList.remove('map--faded');
  form.classList.remove('notice__form--disabled');
  enableDisableFieldset(false);
  addPinsToMap(rentalUnits, pinsTemplate, pinsPlace);
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
  addCard(rentalUnits, currentAvatar, cardTemplate, pinsPlace);
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
  if (evt.keyCode === ENTER_KEYCODE) {
    pinClickHandler(evt);
  }
}

/**
 * The event handler for the activate main pin using the enter key.
 * @param {object} evt - the event object
 */
function pinMainPressEnterHandler(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    pinMainMouseupHandler(evt);
  }
}

/**
 * The event handler for the close popup using the esc key.
 * @param {object} evt - the event object
 */
function popupClosePressEscHandler(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    popupCloseClickHandler();
  }
}

/**
 * The event handler for the close popup using mouse click.
 */
function popupCloseClickHandler() {
  clearActivePin();
  map.querySelector('.popup').remove();
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

var timein = document.querySelector('#timein');
var timeout = document.querySelector('#timeout');
var type = document.querySelector('#type');
var price = document.querySelector('#price');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

timein.addEventListener('change', selectChangeHandler);
timeout.addEventListener('change', selectChangeHandler);
price.addEventListener('input', typeChangeHandler);
roomNumber.addEventListener('change', roomNumberChangeHandler);

/**
 * Event handler binds the fields timein and timeout.
 * @param {object} evt - the event object
 */
function selectChangeHandler(evt) {
  if (evt.currentTarget === timein) {
    timeout.selectedIndex = timein.selectedIndex;
  } else if (evt.currentTarget === timeout) {
    timein.selectedIndex = timeout.selectedIndex;
  }
}

/**
 * Event handler binds the fields type and price.
 * @param {object} evt - the event object
 */
function typeChangeHandler(evt) {
  var value = +evt.currentTarget.value;
  if (value < 1000) {
    type.selectedIndex = 1;
  } else if (value >= 1000 && value < 5000) {
    type.selectedIndex = 0;
  } else if (value >= 5000 && value < 10000) {
    type.selectedIndex = 2;
  } else if (value >= 10000) {
    type.selectedIndex = 3;
  }
}

/**
 * Event handler binds the fields room number and capacity.
 * @param {object} evt - the event object.
 */
function roomNumberChangeHandler(evt) {
  var number = evt.currentTarget.selectedIndex;
  switch (number) {
    case 0 :
      capacity.selectedIndex = 2;
      break;
    case 1:
      capacity.selectedIndex = 1;
      break;
    case 2:
      capacity.selectedIndex = 0;
      break;
    default :
      capacity.selectedIndex = 3;
      break;
  }
}
