/* global jQuery */

(function ($) {
	'use strict';

	$(document).ready(function () {
		var width = $('#contenedor_ppal').width();
		var height = $('#contenedor_ppal').height();
		$('.popup-wrapper').css('padding', (height/2)*0.8+'px 15%');
		$('.cerrar-popup-btn').on('click touchstart', cerrarPopup);
		$('.popup-wrapper').on('click touchstart', cerrarPopup);
		$('.popup').on('click touchstart', cancelBubbling);
	});

	function cerrarPopup(e) {
		e.preventDefault();
		$('.popup-wrapper').hide();
		$('#btn-repetir').show();
	}

	function cancelBubbling(e){
		e.preventDefault();
		return false;
	}

})(jQuery);
