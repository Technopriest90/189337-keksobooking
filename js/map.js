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
map.classList.remove('map--faded');
addPinsToMap(rentalUnits, pinsTemplate, pinsPlace);
addCards(rentalUnits, cardTemplate, map);


function getNonrepeatingRandomValue(array) {
  return array.splice(Math.floor(Math.random() * array.length), 1);
}

function getRandomValue(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArray(array) {
  var newArr = new Array(getRandomNumber(1, array.length));
  var temp = array.slice();
  for (var i = 0; i < newArr.length; i++) {
    newArr[i] = getNonrepeatingRandomValue(temp);
  }
  return newArr;
}

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

function renderPin(rentalUnit, pinTemplate) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = rentalUnit.location.x + 'px';
  pin.style.top = rentalUnit.location.y + 'px';
  pin.querySelector('img').setAttribute('src', rentalUnit.author.avatar);
  return pin;
}

function addPinsToMap(rental, pinTemplate, pinPlace) {
  var temp = document.createDocumentFragment();
  for (var i = 0; i < rental.length; i++) {
    temp.appendChild(renderPin(rental[i], pinTemplate));
  }
  pinPlace.appendChild(temp);
}

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

function addLiFromArray(array, place) {
  for (var i = 0; i < array.length; i++) {
    var newLi = document.createElement('li');
    newLi.className = 'feature feature--' + array[i];
    place.appendChild(newLi);
  }
}

function clearChildren(place) {
  while (place.children.length !== 0) {
    place.children[0].remove();
  }
}

function renderCard(rentalUnit, cardTemplate) {
  var card = cardTemplate.cloneNode(true);
  card.querySelector('h3').textContent = rentalUnit.offer.title;
  card.querySelector('small').textContent = rentalUnit.offer.address;
  card.querySelector('.popup__price').textContent = rentalUnit.offer.price + '&#x20bd;/ночь';
  card.querySelector('h4').textContent = translateType(rentalUnit.offer.type);
  card.querySelector('h4').nextSibling.textContent = rentalUnit.offer.rooms + ' для ' + rentalUnit.offer.guests + ' гостей';
  card.querySelector('.popup__features').previousElementSibling.textContent = 'Заезд после ' + rentalUnit.offer.checkin + ', выезд до ' + rentalUnit.offer.checkout;
  clearChildren(card.querySelector('.popup__features'));
  addLiFromArray(rentalUnit.offer.features, card.querySelector('.popup__features'));
  card.querySelector('.popup__features').nextSibling.textContent = rentalUnit.offer.description;
  card.querySelector('img').setAttribute('src', rentalUnit.author.avatar);
  return card;
}

function addCards(rental, cardTemplate, cardPlace) {
  var temp = document.createDocumentFragment();
  for (var i = 0; i < rental.length; i++) {
    temp.appendChild(renderCard(rental[i], cardTemplate));
  }
  cardPlace.appendChild(temp);
}
