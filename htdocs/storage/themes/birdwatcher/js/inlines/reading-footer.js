/**
 * Show books defined via hash
 */
 (function() {
 	if (location.hash && document.querySelectorAll && document.body.classList) {
 		var hideBook = function(e) {
 			if (!e.target.classList.contains('js-filter-tag')) return;
 			book.style.display = null;
 			filter.removeEventListener('click', hideBook, false);
 		};

 		var container = document.querySelector('[data-component="tag-filter"]');
 		if (!container) return;

 		var id = location.hash.slice(1);
 		var book = document.getElementById(id);
 		if (book) {
 			container.className = '';
 			book.style.display = 'block';

 			var filter = document.querySelector('.js-filter');
 			filter.addEventListener('click', hideBook, false);
 		}
 	}
 })();
