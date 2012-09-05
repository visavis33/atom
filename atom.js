// Atom Modal Dialog
(function ($) {
	/*
	 * Create and display a modal dialog
	 *
	 * @param {string} an html string
	 * @param {object} [options] An optional object containing options overrides
	 */
	$.atom = function (html, options) {
		return $.atom.impl.open(html, options);
	};
	
	/*
	 * Close the modal dialog
	 */
	$.atom.close = function () {
		$.atom.impl.close();
	};
	
	/*
	 * Atom default options
	 */
	$.atom.defaults = {
		maskClass: 'atomMask',
		modalClass: 'atomModal',
		close: true,
		closeHTML: '&#x2716;',
		closeClass: 'atomClose',
		onOpen: null,
		onClose: null
	};
	
	/*
	 * Atom dialog implementation
	 */
	$.atom.impl = {
		/*
		 * Data contains the modal dialog elements and is the object passed
		 * back to the callback (onOpen, onClose) functions
		 */
		d: {},
		/*
		 * Queue contains the array for calling multiple modal dialog elements
		 * sequentially without overlapping
		 */
		q: [],
		/*
		 * Open the modal dialog
		 */
		open: function (html, options) {
			var a = this;
			
			//push the modal onto the queue
			a.q.push(function(){
				// merge defaults and user options
				a.o = $.extend({}, $.atom.defaults, options);

				// create the mask
				a.d.mask = $(document.createElement('div'))
					.addClass(a.o.maskClass)
					.appendTo('body');
				
				// create the modal
				a.d.modal = $(document.createElement('div'))
					.addClass(a.o.modalClass)
					.append(a.o.close ? $(document.createElement('a'))
						.addClass(a.o.closeClass)
						.append(a.o.closeHTML)
						.bind('click.atom', function (e) {
							e.preventDefault();
							a.close();
						}) : '')
					.append(html)
					.appendTo('body');
					
				// bind window resize to center the dialog
				$(window).bind('resize.atom orientationchange.atom', function () {
					a.d.modal.css({
						top: this.innerHeight/2 - a.d.modal.outerHeight(true)/2,
						left: this.innerWidth/2 - a.d.modal.outerWidth(true)/2
					});
				}).resize();

				// execute the onOpen callback
				if ($.isFunction(a.o.onOpen)) {
					a.o.onOpen.apply(a, [a.d]);
				}
			});
			
			// shift the queue
			if(a.q.length > 0 && !a.d.modal) {
				a.q.shift()();
			}
		},
		/*
		 * Close the modal dialog
		 */
		close: function () {
			var a = this;

			// unbind the events
			$('.' + a.o.closeClass).unbind('click.atom');
			$(window).unbind('.atom');

			// execute the onClose callback
			if ($.isFunction(a.o.onClose)) {
				a.o.onClose.apply(a, [a.d]);
			}
			
			// remove the remaining elements
			a.d.modal.hide().remove();
			a.d.mask.hide().remove();

			// reset the dialog object
			a.d = {};
			
			// shift the queue
			if(a.q.length > 0) {
				a.q.shift()();
			}
		}
	}

})(jQuery);