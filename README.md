atom
====

A light-weight modal dialog built with jQuery.

Once jQuery and atom.js are included, you can call the popup like this:

	$.atom("my html");
	
To hide, you can click the close button, or manually call:

	$.atom.close();
	
To override atom's configuration defaults:

	$.atom.defaults = {
		outerClass: 'atom',
		innerClass: '',
		close: true,
		closeHTML: '&#x2716;',
		onOpen: $.noop,
		onClose: $.noop
	};
