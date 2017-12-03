'use strict';

(function () {
  window.util = {
    /**
     * Gets a random nonreapeating element from an array
     * @param {array} array - Group of elements to produce a random from them.
     * @return {string} - Returns a random nonreapeating element of the array.
     */
    getNonrepeatingRandomValue: function (array) {
      return array.splice(Math.floor(Math.random() * array.length), 1);
    },

    /**
     * Gets a random element from an array
     * @param {array} array - Group of elements to produce a random from them.
     * @return {string} - Returns a random element of the array.
     */
    getRandomValue: function (array) {
      return array[Math.floor(Math.random() * array.length)];
    },

    /**
     * Gets a random number from the range includes extreme values
     * @param {number} min - The minimum value of the range.
     * @param {number} max - The maximum value of the range.
     * @return {string} - Returns a random number from range.
     */
    getRandomNumber: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Gets a random subarray from an array.
     * @param {array} array - Group of elements to extract the subarray.
     * @return {array} newArr - Returns a random subarray.
     */
    getRandomArray: function (array) {
      var newArr = new Array(this.getRandomNumber(1, array.length));
      var temp = array.slice();
      for (var i = 0; i < newArr.length; i++) {
        newArr[i] = this.getNonrepeatingRandomValue(temp);
      }
      return newArr;
    },
    /**
     * The event handler examines the key pressed is esc.
     * @param {object} evt - event
     * @param {function} action - A function to be run if a key is pressed.
     */
    isEscPress: function (evt, action) {
      if (evt.keyCode === window.constants.ESC_KEYCODE) {
        action();
      }
    },
    /**
     * The event handler examines the key pressed is enter.
     * @param {object} evt - event
     * @param {function} action - A function to be run if a key is pressed.
     */
    isEnterPress: function (evt, action) {
      if (evt.keyCode === window.constants.ENTER_KEYCODE) {
        action();
      }
    }

  };
})();

