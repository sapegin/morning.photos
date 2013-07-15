/**
 * jQuery Tag Filter
 *
 * @version 0.2
 * @requires jQuery, HashNav
 * @author Artem Sapegin
 * @copyright 2012 Artem Sapegin (sapegin.me)
 * @license MIT
 */

/*global jQuery:false, define:false, HashNav:false*/
(function (factory) {  // Try to register as an anonymous AMD module
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(jQuery);
	}
}(function ($) {

$.fn.tagFilter = function(options) {
	options = $.extend({}, $.fn.tagFilter.defaults, options);

	return this.each(function() {
		new TagFilter($(this), options);
	});
};

$.fn.tagFilter.defaults = {
	barSelector: '.tags',
	linkSelector: 'li',
	linkActiveClass: 'is-active',
	tagClassPrefix: 'tag_'
};

function TagFilter(container, options) {
	this.container = container;
	this.options = options;
	this.init();
}

TagFilter.prototype = {
	init: function() {
		this.bar = this.container.find(this.options.barSelector);
		if (!this.bar.length) return;

		this.bar.delegate(this.options.linkSelector, 'click', $.proxy(this.tagClick, this));

		this.tagClassRegExp = new RegExp('\\b' + this.options.tagClassPrefix + '.*?\\b', 'g');

		var defaultTag = this.container.find('.is-default').data('tag-id');
		if (defaultTag) {
			HashNav.initial(defaultTag);
		}

		HashNav.change(this.change.bind(this));
	},

	tagClick: function(e) {
		this.change($(e.target).data('tag-id'));
		return false;
	},

	change: function(tag) {
		var link = this.container.find('[data-tag-id="' + tag + '"]');
		if (!link.length || link.hasClass(this.options.linkActiveClass)) return;

		// Replace tag class on container
		this.container[0].className = this.container[0].className.replace(this.tagClassRegExp, '');
		if (tag) this.container.addClass(this.options.tagClassPrefix + tag);

		// Highlight button
		link.siblings().removeClass(this.options.linkActiveClass);
		link.addClass(this.options.linkActiveClass);

		// Update page URL
		HashNav.change(tag);
	}
};

}));