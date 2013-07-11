/**
 * HashNav
 *
 * Simple hash navigation
 *
 * @author Artem Sapegin
 * @copyright 2012 Artem Sapegin, http://sapegin.me
 * @license MIT
 */

/*jshint browser:true, jquery:true, white:false, smarttabs:true, eqeqeq:true,
         immed:true, latedef:true, newcap:true, undef:true */
/*global define:false */
(function(factory) {  // Try to register as an anonymous AMD module
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else {
		factory();
	}
}(function() {
	'use strict';

	var HashNav = {
		_inited: false,
		_initial: '',
		_hash: '',
		_callbacks: [],

		/*
		 * Get/set default hash
		 * @param value {String|undefined}
		 */
		initial: function(value) {
			if (value === undefined) {
				return this._initial;
			}
			else {
				if (value !== this._initial) {
					this._initial = value;
					if (location.hash !== value) {
						var hash = location.hash.slice(1);
						this.change(hash || value);
					}
					else {
						this._hash = value;
					}
				}
			}
		},

		/*
		 * Set/execute change handler
		 * @param value {String|Function}
		 */
		change: function(value) {
			if (!this._inited) {
				this._init();
			}

			if (typeof value === 'string') {
				this._change(value);
				this._hash = value;
				if (value === this._initial) {
					this._removeHash();
				}
				else {
					location.hash = value;
				}
			}
			else {
				var that = this;
				this._callbacks.push(value);
				if (this._hash) {
					value(this._hash);
				}
			}
		},

		_change: function(hash) {
			for (var cbIdx = 0; cbIdx < this._callbacks.length; cbIdx++) {
				this._callbacks[cbIdx](hash);
			}
		},

		_init: function() {
			if (!('onhashchange' in window)) return;
			var that = this;
			window.addEventListener('hashchange', function() {
				that._hashChanged();
			}, false);
		},

		_hashChanged: function() {
			var hash = location.hash.slice(1);
			if (hash === this._initial) {
				this._removeHash(true);
				return;
			}
			this._change(hash || this._initial);
		},

		_removeHash: function(replace) {
			if (history.pushState) {
				var url = window.location.pathname + window.location.search;
				history[replace ? 'replaceState' : 'pushState']('', document.title, url);
			}
			else {
				location.hash = '';
			}
		}
	};

	window.HashNav = HashNav;

}));