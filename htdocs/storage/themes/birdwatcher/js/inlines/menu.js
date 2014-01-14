/**
 * Highlight current menu item
 */
(function(){
	if (!document.querySelector) return;
	var activeItem = document.querySelector('.k-nav-current');
	if (!activeItem) return;
	if (activeItem.href === location.origin+location.pathname) {
		var newItem = document.createElement('span');
		newItem.className = 'k-nav-current';
		newItem.innerHTML = activeItem.innerHTML;
		activeItem.parentNode.replaceChild(newItem, activeItem);
	}
})();
