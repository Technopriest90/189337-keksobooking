'use strict';

(function () {
  window.backend = {

    /**
     * To obtain data on rental units.
     * @param {function} onLoad - A function running after data load.
     * @param {function} onError - A function running on error.
     */
    load: function (onLoad, onError) {
      var xhr = setupXhr(onLoad, onError);

      xhr.open('GET', window.constants.SERVER_URL_GET);
      xhr.send();
    },

    /**
     * Sends data from the form.
     * @param {object} data - Data from the form
     * @param {function} onLoad - A function running after data load.
     * @param {function} onError - A function running on error.
     */
    save: function (data, onLoad, onError) {
      var xhr = setupXhr(onLoad, onError);

      xhr.open('POST', window.constants.SERVER_URL_POST);
      xhr.send(data);
    },

    /**
     * The error handler.
     * @param {string} errorMessage - The error information.
     */
    errorHandler: function (errorMessage) {
      var errorWindow = document.createElement('div');
      errorWindow.style.zIndex = 100;
      errorWindow.style.position = 'absolute';
      errorWindow.style.left = '0';
      errorWindow.style.right = '0';
      errorWindow.style.top = '0';
      errorWindow.style.textAlign = 'center';
      errorWindow.style.backgroundColor = 'white';
      errorWindow.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', errorWindow);
    }
  };

  /**
   * Configures the XML http request.
   * @param {function} onLoad - A function running after data load.
   * @param {function} onError - A function running on error.
   * @return {object} xhr - Return XML http request;
   */
  function setupXhr(onLoad, onError) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });

    xhr.timeout = 2000;

    return xhr;
  }
})();
