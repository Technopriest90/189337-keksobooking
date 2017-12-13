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
    TYPES: ['flat', 'house', 'bungalo'],
    TIMES: ['12:00', '13:00', '14:00'],
    FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
    NUMBER_OF_RENTAL_UNIT: 8,
    ESC_KEYCODE: 27,
    ENTER_KEYCODE: 13,
    SERVER_URL_GET: 'https://1510.dump.academy/keksobooking/data',
    SERVER_URL_POST: 'https://1510.dump.academy/keksobooking',
    RENTAL_UNITS: null
  };
})();
