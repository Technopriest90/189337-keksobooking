'use strict';

(function () {
  window.constants = {
    OFFSET_Y: 46,
    OFFSET_X: 5,
    AVATARS_NUMBERS: ['01', '02', '03', '04', '05', '06', '07', '08'],
    TYPE: {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом'
    },
    TITLES: ['Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'],
    TYPES: ['bungalo', 'flat', 'house', 'palace'],
    PRICES: [0, 1000, 5000, 10000],
    PRICES_FILTER: {
      low: 10000,
      middle: [10000, 50000],
      high: 50000
    },
    TIMES: ['12:00', '13:00', '14:00'],
    ROOMS: ['1', '2', '3', '100'],
    CAPACITY: ['1', '2', '3', '0'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    NUMBER_OF_RENTAL_UNIT: 5,
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    SERVER_URL_GET: 'https://1510.dump.academy/keksobooking/data',
    SERVER_URL_POST: 'https://1510.dump.academy/keksobooking',
    RENTAL_UNITS: null
  };
})();
