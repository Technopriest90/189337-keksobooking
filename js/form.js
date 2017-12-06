'use strict';

(function () {
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
})();
