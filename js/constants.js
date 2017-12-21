'use strict';

(function () {
  window.constants = {
    OFFSET_Y: 46,
    OFFSET_X: 5,
    TYPE: {
      flat: 'Квартира',
      bungalo: 'Бунгало',
      house: 'Дом'
    },
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
    RENTAL_UNITS: null,
    DEBOUNCE_INTERVAL: 500,
    TIMEOUT_TIME: 10000,
    ERRORMSG_TIME: 2000,
    CODE_OK: 200,
    BASE_PIN_COORD: {
      x: 600,
      y: 375
    },
    RESTRICTION: {
      top: 200,
      right: 1200,
      down: 700,
      left: 0
    },
    PIN_PADDING: 20,
    FILES_TYPES: ['png', 'jpg', 'jpeg', 'gif'],
    SCROLL_INTERVAL: 5
  };
})();
