'use strict';

(function () {
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var form = document.querySelector('.notice__form');

  window.sync.synchronizeFields(timein, timeout, window.constants.TIMES, window.constants.TIMES, window.sync.syncValues);
  window.sync.synchronizeFields(timeout, timein, window.constants.TIMES, window.constants.TIMES, window.sync.syncValues);
  window.sync.synchronizeFields(type, price, ['bungalo', 'flat', 'house', 'palace'], [0, 1000, 5000, 10000], window.sync.syncValueWithMin);
  window.sync.synchronizeFields(roomNumber, capacity, ['1', '2', '3', '100'], ['1', '2', '3', '0'], window.sync.syncValues);
  form.addEventListener('submit', formSubmitHandler);

  /**
   * Handler for form submission.
   * @param {object} evt - the event object.
   */
  function formSubmitHandler(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), function () {
      window.pin.disableFieldset(true);
    }, window.backend.errorHandler);
  }
})();
