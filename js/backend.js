(function () {
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = setupXhr(onLoad, onError);

      xhr.open('GET', window.constants.SERVER_URL_GET);
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = setupXhr(onLoad, onError);

      xhr.open('POST', window.constants.SERVER_URL_POST);
      xhr.send(data);
    },
    errorHandler: function (errorMessage) {
      var errorWindow = document.createElement('div');
      errorWindow.style.zIndex = 100;
      errorWindow.style.position = 'absolute';
      errorWindow.style.left = '50%';
      errorWindow.style.top = '50%';
      errorWindow.style.width = '300px';
      errorWindow.style.height = '200px';
      errorWindow.style.textAlign = 'center';
      errorWindow.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', errorWindow);
    }
  };

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

    xhr.timeout = 1;

    return xhr;
  }
})();
