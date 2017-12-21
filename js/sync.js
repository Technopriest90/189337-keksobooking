'use strict';
(function () {
  window.sync = {
    /**
     * Connects one field with another..
     * @param {object} firstField - Link to first field.
     * @param {object} secondField - Link to second field.
     * @param {array} firstValues - An array with the valuesCb of the first field.
     * @param {array} secondValues - An array with the valuesCb of the second field
     * @param {function} action - The action at which contact events.
     */
    fields: function (firstField, secondField, firstValues, secondValues, action) {
      firstField.addEventListener('change', function () {
        action(secondField, secondValues[firstValues.indexOf(firstField.value)]);
      });
    },
    /**
     * Changes the field's value element.
     * @param {object} element - The element whose value is changing.
     * @param {*} value - The value assigned to the element.
     */
    valuesCb: function (element, value) {
      element.value = value;
    },
    /**
     * Change the value of the field element and sets the minimum limit.
     * @param {object} element - The element whose value is changing.
     * @param {*} value - The value assigned to the element.
     */
    valueWithMinCb: function (element, value) {
      element.value = value;
      element.min = value;
    }
  };
})();
