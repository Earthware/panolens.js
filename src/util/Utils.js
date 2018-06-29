(function(){
	
	'use strict';

	/**
	 * Utility
	 * @namespace PANOLENS.Utils
	 * @memberOf PANOLENS
	 * @type {object}
	 */
	PANOLENS.Utils = {};

	PANOLENS.Utils.checkTouchSupported = function () {

		return window ? 'ontouchstart' in window || window.navigator.msMaxTouchPoints : false;

	};

	PANOLENS.Utils.checkIsIE10 = function(){
		return document.documentMode != undefined && document.documentMode < 11;
	}

})();