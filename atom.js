// Atom Modal Dialog
(function ($) {
	var queue = [], next = false;
		
	/*
	 * Create and display a modal dialog.
	 *
	 * @param {string} an html string
	 * @param {object} [options] An optional object containing options overrides
	 */
	$.atom = function (html, options) {
		return $.atom.impl.init(html, options);
	};
	
	/*
	 * Close the modal dialog.
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
		maskClose: false,
		onOpen: null,
		onShow: null,
		onClose: null
	};
	
	/*
	 * Main modal object
	 * o = options
	 */
	$.atom.impl = {
		/*
		 * Contains the modal dialog elements and is the object passed
		 * back to the callback (onOpen, onShow, onClose) functions
		 */
		d: {},
		/*
		 * Initialize the modal dialog
		 */
		init: function (data, options) {
			var a = this;
			
			//push the modal onto the queue
			q.push(function(){
				// merge defaults and user options
				a.o = $.extend({}, $.atom.defaults, options);

				// create the mask and modal
				a.create(data);

				// display the modal dialog
				a.open();

				// execute the onShow callback
				if ($.isFunction(a.o.onShow)) {
					a.o.onShow.apply(a, [a.d]);
				}
			});
			
			// shift the queue
			if(!next && queue.length > 0){
				queue.shift()();
				next = true;
			}
		},
		/*
		 * Create and add the modal overlay and container to the page
		 */
		create: function (data) {
			var a = this;

			// create the mask
			a.d.mask = $('<div></div>')
				.addClass(a.o.maskClass)
				.css('display', 'none')
				.appendTo('body');

			// create the modal
			a.d.modal = $('<div></div>')
				.addClass(a.o.modalClass)
				.css('display', 'none')
				.append(a.o.close && a.o.closeHTML ? $('<a></a>').addClass(a.o.closeClass).append(a.o.closeHTML) : '')
				.append(data)
				.appendTo('body');

			// center the modal
			a.center();
		},
		/*
		 * Bind events
		 */
		bindEvents: function () {
			var a = this;

			// bind the close event to any element with the closeClass class
			$('.' + a.o.closeClass).bind('click.atom', function (e) {
				e.preventDefault();
				a.close();
			});

			// bind the overlay click to the close function, if enabled
			if (a.o.maskClose) {
				a.d.mask.bind('click.atom', function (e) {
					e.preventDefault();
					a.close();
				});
			}

			// update window size
			$(window).bind('resize.atom orientationchange.atom', function () {
				// center the dialog
				a.center();
			});
		},
		/*
		 * Unbind events
		 */
		unbindEvents: function () {
			$('.' + this.o.closeClass).unbind('click.atom');
			$(window).unbind('.atom');
			this.d.mask.unbind('click.atom');
		},
		center: function () {
			var a = this,
				hc = ($(window).height()/2) - (a.d.modal.outerHeight(true)/2),
				wc = ($(window).width()/2) - (a.d.modal.outerWidth(true)/2);
				
			a.d.modal.css({left: wc, top: hc});
		},
		open: function () {
			var a = this;

			// execute the onOpen callback
			if ($.isFunction(a.o.onOpen)) {
				a.o.onOpen.apply(a, [a.d]);
			}
			
			// display the remaining elements
			a.d.mask.show();
			a.d.modal.show();

			// bind default events
			a.bindEvents();
		},
		close: function () {
			var a = this;

			// remove the default events
			a.unbindEvents();

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
			next = queue.length > 0 ? true : false;
			if(next) queue.shift()();
		}
	}

})(jQuery);