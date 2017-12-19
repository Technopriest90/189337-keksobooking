'use strict';

(function () {
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var form = document.querySelector('.notice__form');
  var mapFilter = document.querySelectorAll('.map__filter');
  var mapFilterCheckbox = document.querySelectorAll('input[name=features]');

  window.sync.synchronizeFields(
      timein, timeout,
      window.constants.TIMES, window.constants.TIMES,
      window.sync.syncValues);

  window.sync.synchronizeFields(
      timeout, timein,
      window.constants.TIMES, window.constants.TIMES,
      window.sync.syncValues);

  window.sync.synchronizeFields(
      type, price,
      window.constants.TYPES, window.constants.PRICES,
      window.sync.syncValueWithMin);

  window.sync.synchronizeFields(
      roomNumber, capacity,
      window.constants.ROOMS, window.constants.CAPACITY,
      window.sync.syncValues);

  form.addEventListener('submit', formSubmitHandler);
  addEventsToFilter();

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
  /**
   * Adds event handlers to control buttons on filter.
   */
  function addEventsToFilter() {
    for (var i = 0; i < mapFilter.length; i++) {
      mapFilter[i].addEventListener('change', window.util.debounce(window.pin.updatePins));
    }
    for (var j = 0; j < mapFilterCheckbox.length; j++) {
      mapFilterCheckbox[j].addEventListener('change', window.util.debounce(window.pin.updatePins));
    }
  }
})();
