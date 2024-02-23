(function ($) {
	'use strict';

	$.fn.igKeypad = function (options) {
		var defaults = {
			keys: [],
			class: 'ig-keypad',
			target: 'input:not([disabled])',
			events: 'click touchstart'
		}
		var settings = $.extend({}, defaults, options);
		var $target = $(settings.target);

		return this.each(function () {

			var $ul = $('<ul>').addClass(settings.class);
			for (var i = 0; i < settings.keys.length; i++) {
				var $item = $('<li>')
					.addClass(settings.class + '-key')
					.append(
						$('<a href="#">')
						.data('value', settings.keys[i])
						.html(settings.keys[i])
					);
				$item.on(settings.events, 'a', function (e) {
					e.preventDefault();
					if (!$target.attr('disabled') && $target.val().length < $target.attr('maxlength')) {
						$target.val($target.val() + $(this).data('value')).change()
					}
				})
				$ul.append($item);
			}
			var $backspace = $('<li>')
				.addClass(settings.class + '-key')
				.addClass('backspace-key')
				.append(
					$('<a href="#">').html('&#8592;')
				)
			$backspace.on(settings.events, 'a', function (e) {
				e.preventDefault();
				if (!$target.attr('disabled')) {
					$target.val($target.val().slice(0, -1)).change();
				}
			})

			$ul.append($backspace);
			$(this).html($ul);

			$target.data('regex', '[^' + settings.keys.join('') + ']');
			$target.on('input change', filterInput);

		})


		function filterInput() {
			var currentVal = $(this).val();
			var regex = new RegExp($(this).data('regex'), 'g');
			var newVal = currentVal.replace(regex, '');
			$(this).val(newVal);
		}


	}
}(jQuery));
