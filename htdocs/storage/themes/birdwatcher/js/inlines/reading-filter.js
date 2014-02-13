/**
 * Books filter
 */
 (function() {
 	if (location.hash && document.querySelectorAll && document.body.classList) {
 		var container = document.querySelector('[data-component="tag-filter"]');
 		if (!container) return;

 		var defaultItem = document.querySelector('.js-filter .is-default');
 		if (!defaultItem) return;
 		container.classList.remove('tag_' + defaultItem.getAttribute('data-tag-id'));
 		defaultItem.classList.remove('is-active');

 		var tag = location.hash.slice(1);
 		var activeItem = document.querySelector('.js-filter-tag[data-tag-id="' + tag + '"]');
 		if (!activeItem) return;
 		container.classList.add('tag_' + tag);
 		activeItem.classList.add('is-active');
 	}
 })();
