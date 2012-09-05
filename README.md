atom
A light-weight modal jquery plugin that is easy to use.

Once the script is included, you can call the popup like this:

$.atom.open("<div>my html</div>");
To hide, you can click the close button, or manually call:

$.atom.close()

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