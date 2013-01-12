// Atom modal dialog
(function ($) {
	/*
	 * Create and display a modal dialog
	 *
	 * @param {string} an html string
	 * @param {object} [options] An optional object containing options overrides
	 */
	$.atom = function (h, o) {
		// merge defaults and user options
		var s = $.extend({}, $.atom.defaults, o),
		
		// create the element
			a = $('<div>')
				.addClass(s.outerClass)
				.on('click', function () { a.remove(); })
				.append($('<div>')
					.addClass(s.innerClass)
					.on('click', function (e) { e.stopPropagation(); })
					.append(s.close ? $('<span>')
						.addClass('close')
						.append(s.closeHTML)
						.on('click', function () { a.remove(); }) : '')
					.append(h))
				.appendTo('body');
			
		// activate callback function		
		s.callback.apply(null, [a]);
	};

	/*
	 * Atom default options
	 */
	$.atom.defaults = {
		outerClass: 'atom',
		innerClass: '',
		close: true,
		closeHTML: '&#x2716;',
		callback: $.noop
	};
})(jQuery);