'use strict';

var map = document.querySelector('.map');
var mapPinMain = map.querySelector('.map__pin--main');

window.pin.enableDisableFieldset(true);
window.pin.pinMainAddHandlers(mapPinMain);

