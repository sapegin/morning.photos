// Author: Artem Sapegin, http://sapegin.me, 2014
// <a href="{{ album.url }}" data-component="hotkey" data-hotkey="esc">

/*global tamia:false*/
;(function(window, $, undefined) {
	'use strict';

	var _doc = $(document);

	var keys = {
		esc: 27
	};

	var elemsMap = {};
	var inited = false;

	function initHandler() {
		_doc.on('keydown', function(event) {
			var keycode = event.which;
			var elems = elemsMap[keycode];
			if (!elems) return;

			event.preventDefault();
			for (var elem in elems) {
				var url = elem.attr('href');
				if (url) {
					location.href = url;
				}
			}
		});
	}

	tamia.initComponents({
		'hotkey': function(elem) {
			elem = $(elem);

			var hotkey = elem.data('hotkey');
			var keycode = keys[hotkey];
			if (!elemsMap[keycode]) elemsMap[keycode] = [];
			elemsMap[keycode].push(elem);

			if (!inited) {
				initHandler();
				inited = true;
			}
		}
	});

}(window, jQuery));
