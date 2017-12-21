'use strict';

(function () {
  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');
  var type = document.querySelector('#type');
  var price = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');
  var form = document.querySelector('.notice__form');
  var fileAvatarChooser = document.querySelector('#avatar');
  var previewAvatar = document.querySelector('.notice__preview img');
  var avatarDropZone = document.querySelector('.notice__photo .drop-zone');
  var fileImageChooser = document.querySelector('#images');
  var previewImage = document.querySelector('.form__photo-container');
  var imageDropZone = previewImage.querySelector('.drop-zone');

  window.sync.fields(
      timein, timeout,
      window.constants.TIMES, window.constants.TIMES,
      window.sync.valuesCb);

  window.sync.fields(
      timeout, timein,
      window.constants.TIMES, window.constants.TIMES,
      window.sync.valuesCb);

  window.sync.fields(
      type, price,
      window.constants.TYPES, window.constants.PRICES,
      window.sync.valueWithMinCb);

  window.sync.fields(
      roomNumber, capacity,
      window.constants.ROOMS, window.constants.CAPACITY,
      window.sync.valuesCb);

  document.addEventListener('drop', documentDropHandler);
  document.addEventListener('dragover', documentDropHandler);
  form.addEventListener('submit', formSubmitHandler);
  fileAvatarChooser.addEventListener('change', fileChangeHandler(fileAvatarChooser, previewAvatar, avatarPreviewCallback));
  fileImageChooser.addEventListener('change', fileChangeHandler(fileImageChooser, previewImage, imagePreviewCallback));
  avatarDropZone.addEventListener('drop', fileDropHandler);
  imageDropZone.addEventListener('drop', fileDropHandler);
  price.min = window.constants.PRICES[1];

  /**
   * Handler for form submission.
   * @param {object} evt - the event object.
   */
  function formSubmitHandler(evt) {
    evt.preventDefault();
    window.backend.save(new FormData(form), window.pin.siteReset, window.backend.errorHandler);
    window.util.clearCollection(previewImage.querySelectorAll('img'));
    previewAvatar.src = 'img/muffin.png';
    price.min = window.constants.PRICES[1];
  }

  /**
   * Handler for document.
   * @param {object} evt - the event object.
   */
  function documentDropHandler(evt) {
    evt.preventDefault();
  }

  /**
   * The event handler on drop files to a form.
   * @param {object} evt - the event object.
   */
  function fileDropHandler(evt) {
    if (evt.target.parentNode.querySelector('#avatar')) {
      fileAvatarChooser.files = evt.dataTransfer.files;
    } else if (evt.target.parentNode.querySelector('#images')) {
      fileImageChooser.files = evt.dataTransfer.files;
    }
  }

  /**
   * Handler for file upload fields.
   * @param {object} input - The field for entering the file.
   * @param {object} preview - Place to preview the file.
   * @param {function} callback - The function of processing the file after downloading.
   * @return {function} - return this function.
   */
  function fileChangeHandler(input, preview, callback) {
    return function () {
      var file = input.files[0];
      var fileName = file.name.toLowerCase();

      if (fileTypeMatches(fileName)) {
        var fileStream = new FileReader();

        fileStream.addEventListener('load', callback(preview, fileStream));

        fileStream.readAsDataURL(file);
      }
    };
  }

  /**
   * Handler download avatars.
   * @param {object} preview - Place to preview the file.
   * @param {object} fileStream - File stream.
   * @return {function} - return this function.
   */
  function avatarPreviewCallback(preview, fileStream) {
    return function () {
      preview.src = fileStream.result;
    };
  }

  /**
   * Handler download images.
   * @param {object} preview - Place to preview the file.
   * @param {object} fileStream - File stream.
   * @return {function} - return this function.
   */
  function imagePreviewCallback(preview, fileStream) {
    return function () {
      var node = document.createElement('img');
      node.src = fileStream.result;
      node.setAttribute('draggable', 'true');
      node.width = '100';
      node.height = '100';
      preview.appendChild(node);
    };
  }

  /**
   * Checks the supported format.
   * @param {object} fileName - Place to preview the file.
   * @return {bool} - Returns true if format is supported.
   */
  function fileTypeMatches(fileName) {
    return window.constants.FILES_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
  }
})();
