# Author: Artem Sapegin, http://sapegin.me, 2014

'use strict'

$ = jQuery
_win = $(window)
_doc = $(document)

tamia.initComponents(
	'featured-album': (elem) ->
		resize = ->
			contentContainer.css('margin-top', container.height())

		load = ->
			$('body').addClass('is-ok')

		container = $(elem)
		contentContainer = $('.js-content')
		photos = window.__photos

		container.fotorama({
			nav: false
			transition: 'dissolve'
			loop: true
			autoplay: 7000
			width: '100%'
			minHeight: 300
			maxHeight: '100%'
			fit: 'cover'
		})
		container.on('fotorama:load', resize)
		container.on('fotorama:load', load)

		fotorama = container.data('fotorama')
		fotorama.load(photos)

		_win.resize(resize)

	'tag-filter': tagFilter:
		barSelector: '.js-filter'
		linkSelector: '.js-filter-tag'

	'parallax': (elem) ->
		return  unless window.pageYOffset?

		container = $(elem)
		speed = container.data('speed') or 0.5
		screenHeight = screen.height
		_doc.scroll( ->
			pageY = window.pageYOffset
			if pageY < screenHeight
				offset = -pageY * speed
				container.css('transform', "translateY(#{offset}px)")
		)

)
