$(window).resize(scaleToProportion);
$(document).ready(scaleToProportion);

function scaleToProportion() {
	var defaultProportion = 16/10;
	var currentWidth = $(window).width();
	var currentHeight = $(window).height();
	var proportion = currentWidth / currentHeight;


	if(proportion > defaultProportion){
  		$('.contenedor_interactivo').css('width',currentHeight*defaultProportion).css('height','100%');
	}else{
  		$('.contenedor_interactivo').css('height',currentWidth*(1/defaultProportion)).css('width','100%');
	}
	var totalHeight = $('.contenedor_interactivo').height();
	var headerHeight = $('#cabecera').height();
	$('#contenedor_ppal').css('height',parseInt(totalHeight-headerHeight-7)+'px');

	var marginTop = (currentHeight-totalHeight) / 2;
	$('.contenedor_interactivo').css('margin-top',marginTop);
}
