// Atom modal dialog
(function ($) {
	/*
	 * Atom dialog implementation
	 */
	var a = {
		/*
		 * Data contains the modal dialog elements and is the object passed
		 * back to the callback (onOpen, onClose) functions
		 */
		d: null,
		/*
		 * Queue contains the array for calling multiple modal dialog elements
		 * sequentially without overlapping
		 */
		q : []
	};
	
	/*
	 * Create and display a modal dialog
	 *
	 * @param {string} an html string
	 * @param {object} [options] An optional object containing options overrides
	 */
	$.atom = function (html, options) {
		//push the modal onto the queue
		a.q.push(function(){
			// merge defaults and user options
			a.o = $.extend({}, $.atom.defaults, options);

			// create the dialog
			a.d = $('<div>')
				.addClass(a.o.outerClass)
				.append($('<div>')
					.addClass(a.o.innerClass)
					.append(a.o.close ? $('<a>')
						.addClass('close')
						.append(a.o.closeHTML)
						.on('click', function (e) {
							e.preventDefault();
							$.atom.close();
						}) : '')
					.append(html))
				.appendTo('body');
					
			// execute the onOpen callback
			a.o.onOpen.apply(a, [a.d]);
		});
			
		// shift the queue
		if(a.q.length > 0 && !a.d) {
			a.q.shift()();
		}
	};
	
	/*
	 * Close the modal dialog
	 */
	$.atom.close = function () {
		// execute the onClose callback
		a.o.onClose.apply(a, [a.d]);
			
		// remove the remaining elements
		a.d.remove();

		// reset the dialog object
		a.d = null;
			
		// shift the queue
		if(a.q.length > 0) {
			a.q.shift()();
		}
	};
	
	/*
	 * Atom default options
	 */
	$.atom.defaults = {
		outerClass: 'atom',
		innerClass: '',
		close: true,
		closeHTML: '&#x2716;',
		onOpen: $.noop,
		onClose: $.noop
	};

})(jQuery);