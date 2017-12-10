'use strict';

(function () {
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  window.sync.synchronizeFields(timein, timeout, window.constants.TIMES, window.constants.TIMES, window.sync.syncValues);
  window.sync.synchronizeFields(timeout, timein, window.constants.TIMES, window.constants.TIMES, window.sync.syncValues);
  window.sync.synchronizeFields(type, price, ['bungalo', 'flat', 'house', 'palace'], [0, 1000, 5000, 10000], window.sync.syncValueWithMin);
  window.sync.synchronizeFields(roomNumber, capacity, ['1', '2', '3', '100'], ['1', '2', '3', '0'], window.sync.syncValues);
})();
