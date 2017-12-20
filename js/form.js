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
  var fileAvatarChooser = document.querySelector('.notice__photo input[type=file]');
  var previewAvatar = document.querySelector('.notice__preview img');
  var fileImageChooser = document.querySelector('.form__photo-container input[type=file]');
  var previewImage = document.querySelector('.form__photo-container');
  var draggedUnit = null;

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
  fileAvatarChooser.addEventListener('change', fileChangeHandler(fileAvatarChooser, previewAvatar, avatarPreviewCallback));
  fileImageChooser.addEventListener('change', fileChangeHandler(fileImageChooser, previewImage, imagePreviewCallback));
  previewImage.addEventListener('dragstart', imageDragStartHandler);
  previewImage.addEventListener('dragover', imageDragOverHandler);
  previewImage.addEventListener('drop', imageDropHandler);

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
  /**
   * Handler transfer photos.
   * @param {object} evt - The event object.
   */
  function imageDragStartHandler(evt) {
    if (isTag(evt.target, 'img')) {
      draggedUnit = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  }
  /**
   * Handler prohibition of transfer photos in some areas.
   * @param {object} evt - The event object.
   */
  function imageDragOverHandler(evt) {
    if (!isTag(evt.target, 'img') && !isTag(evt.target, 'label')) {
      evt.preventDefault();
    }
  }
  /**
   * Handler for drop photos in the area.
   * @param {object} evt - The event object.
   */
  function imageDropHandler(evt) {
    evt.target.appendChild(draggedUnit);
    evt.preventDefault();
  }
  /**
   * Checks whether the item matches the selected tag.
   * @param {object} target - The objective of the audit.
   * @param {string} tag - Tag to check
   * @return {bool} - If matches return true, else false.
   */
  function isTag(target, tag) {
    return target.tagName.toLowerCase() === tag;
  }
})();
