atom
====

A light-weight modal dialog built with jQuery.

Once jQuery and atom.js are included, you can call the popup like this:

	$.atom("my html");
	
To override atom's configuration defaults:

	$.atom.defaults = {
		outerClass: 'atom',
		innerClass: '',
		close: true,
		closeHTML: '&#x2716;'
	};
