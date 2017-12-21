'use strict';

(function () {
  window.util = {
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
    },
    /**
     * Removes all children of parent in DOM.
     * @param {object} place - Parent in DOM.
     */
    clearChildren: function (place) {
      while (place.children.length !== 0) {
        place.children[0].remove();
      }
    },
    /**
     * Removes all node in DOM collection.
     * @param {object} collection - Collection of DOM nodes.
     */
    clearCollection: function (collection) {
      for (var i = 0; i < collection.length; i++) {
        collection[i].remove();
      }
    },

    lastTimeout: null,

    /**
     * Eliminates extra clicks for the filter.
     * @param {function} action - Event on change of filter field.
     * @return {function} - Debounce function.
     */
    debounce: function (action) {
      return function () {
        if (window.util.lastTimeout) {
          window.clearTimeout(window.util.lastTimeout);
        }
        window.util.lastTimeout = window.setTimeout(action, window.constants.DEBOUNCE_INTERVAL);
      };
    },

    /**
     * Smoothly scrolling a website up.
     */
    scrollUp: function () {
      var scrollTop = document.body.scrollTop || window.pageYOffset;
      var timer = setInterval(function () {
        if (scrollTop > 0) {
          window.scroll(0, scrollTop -= window.constants.SCROLL_INTERVAL);
        } else {
          clearInterval(timer);
        }
      }, window.constants.SCROLL_INTERVAL);
    }
  };
})();

