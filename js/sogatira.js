/* jshint browser:true */
/* globals jQuery,  textos */

(function ($, textos) {
	'use strict';


	$(document).ready(function () {
		/* Localización de textos */
		String.locale = 'es';
		String.toLocaleString(textos);
		var l = function (string) {
			return string.toLocaleString();
		};
		$('[data-l10n]').each(function () {
			var textId = $(this).data('l10n');
			$(this).html(l(textId))
		});

		var cual;
		var anchura;
		var medida;
		var alturaTotal;
		var anchuraTotal;
		var contieneImagenes;
		var color;
		var contador = 0;
		var rojo = 0;
		var azul = 0;
	
		reset();

				/* Definición de eventos */
		$('#btn-repetir').on('click touchstart', function (e) {
			e.preventDefault();
			location.reload();
		});
		
		$('.draggable').draggable({
			zIndex: 9999,
			revert: 'invalid',
		});
		
		$( ".droppable" ).droppable({
		  accept: ".draggable",
		  drop: function(event, ui){
			cual = ui.draggable.data('cual');
			color = ui.draggable.data('color');
			if($(this).data('color') == color){
				$(this).droppable( "disable" );
				console.log(ui.draggable);
				cual = ui.draggable.data('cual');
				ui.draggable.hide();
				var ancho = (($(this).height()-10)*160)/458;
				$(this).html('<img src="data/imgs/'+cual+'.png" class="responsive" style="height:'+($(this).height()-10)+'px; width:'+ancho+'px">');
				//contador++;
				if(color == 'R'){
					rojo += ui.draggable.data('valor');
				} else {
					azul += ui.draggable.data('valor');
				}
				if(rojo > 0 && azul > 0){
					$('.cajaTexto').html(l('%empezar'));
					$('.lazo img').attr('src','data/imgs/lazo.gif');
				}
			} else {
				ui.draggable.draggable( "option", "revert", true );
			}
		  }
		});
		
		$('.lazo').on('click',jugar);
		
		function jugar(e) {
			e.preventDefault();
			$('.primero').hide();
			$('.segundo').show();
			$('.droppable').each(function(){
				var leer = $(this).children().attr('src');
				console.log($(this).next('img'));
				if(leer != undefined) {
					leer = leer.replace('data/imgs/', 'data/imgs/soga_');
					$(this).html('<img src="'+leer+'" class="responsive">');
				}
			});
			$('.cajaTexto').html(l('%tirar'));
			$('.lazo').off('click');
			setTimeout(function () {
				tirar();
			}, 500);
			$('#tiratira').trigger('play');
		}
		
		function tirar() {
			$('.lazo img').attr('src','data/imgs/lazo.png');
			var destinoA = Number(String(azul).slice(0,-1));
			var destinoR = Number(String(rojo).slice(0,-1));
			console.log(azul+'/'+destinoA);
			console.log(rojo+'/'+destinoR);
			$('#flechaAzul').animate({
				'right': '+='+destinoA+'px'
			},2500);
			$('#flechaRoja').animate({
				'left': '+='+destinoR+'px'
			},2500, function(){
				$('.resultadoAzul').html(azul+' N');
				$('.resultadoRojo').html(rojo+' N');
				var total;
				if(azul > rojo){
					total = azul-rojo;
					$('#finAzul').css('right','+='+destinoA/2+'px');
					$('.fin').html('<span class="italic">F</span><span class="sub">'+l('%resultante')+'</span> = '+total+' N');
					$('.cajaTexto').html(l('%azul'));
				} else if(rojo > azul){
					total = rojo-azul;
					$('#finRoja').css('left','+='+destinoR/2+'px');
					$('.fin').html('<span class="italic">F</span><span class="sub">'+l('%resultante')+'</span> = '+total+' N');
					$('.cajaTexto').html(l('%rojo'));
				} else {
					$('.fin').html('<span class="italic">F</span><span class="sub">'+l('%resultante')+'</span> = 0 N');
					$('.cajaTexto').html(l('%empate'));
				}
			});
			var totalF;
			var multi = .2;
			if(azul > rojo){
				totalF = azul-rojo;
				if(totalF < 150) multi = .8;
				console.log(multi);
				$('#mover').animate({
					'left': -1*multi*(totalF)+'px'
				},2500);
			} else if(rojo > azul){
				totalF = rojo-azul;
				if(totalF < 150) multi = .8;
				console.log(multi);
				$('#mover').animate({
					'left': multi*(totalF)+'px'
				},2500);
			} else {
				$('#mover').animate({
					'left': '-=50'
				},2500,function(){
					$('#mover').animate({
						'left': '+=100'
					},2500,function(){
						$('#mover').animate({
							'left': '-=50'
						},2500);
					});
				});
			}
			$('#btn-repetir').show();
		}

		function reset(e) {
			if (e) e.preventDefault();
			$('.popup-wrapper').hide();
			$('.segundo').hide();
			$('#btn-continuar').hide();
			//$('#abajo img').load(function() {
				alturaTotal = $('#contenedor_ppal').height()-10;
				anchuraTotal = $('.contenedor_interactivo').width();
				$('#mover').width(anchuraTotal);
				anchura = anchuraTotal/10;
				medida = (440*anchura)/236;
				$('.arriba').height(medida-10);
				$('.fondo').height(medida+10);
				$('.fondo').css('background-size','auto '+medida+'px');
				$('.abajo').height((alturaTotal-medida)-30);
				contieneImagenes = anchuraTotal*.4;
				$('.equipo').css('width',contieneImagenes/4+'px');
			//});
		}


	});
})(jQuery, textos);


Array.prototype.shuffle = function shuffle() {
	var array = this;

	var i = 0,
		j = 0,
		temp = null;

	for (i = array.length - 1; i > 0; i -= 1) {
		j = Math.floor(Math.random() * (i + 1));
		temp = array[i];
		array[i] = array[j];
		array[j] = temp;
	}
};
