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
			arrows: false
			keyboard: false
			click: false
			swipe: false
			trackpad: false
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
		return  if Modernizr.touch
		return  unless window.pageYOffset?

		container = $(elem)
		speed = container.data('speed') or 0.5
		screenHeight = screen.height
		$(window).scroll( ->
			pageY = window.pageYOffset
			if pageY < screenHeight
				offset = -pageY * speed
				container.css('transform', "translateY(#{offset}px)")
		)

	'touch-toggle': (elem) ->
		return  unless Modernizr.touch

		elem = $(elem)
		elem.click( ->
			pressed = elem.hasClass('is-pressed')
			elem.closest('.js-touch-toggle-container').find('.is-pressed').removeClass('is-pressed')
			elem.toggleClass('is-pressed', not pressed)
		)

	'essay-excerpts': (elem) ->
		$(elem).on('click', '.js-more-link', (event) ->
			return  if event.metaKey or event.ctrlKey
			link = $(event.currentTarget)
			link.closest('.js-more').find('.js-more-content').trigger('appear.tamia')
			link.remove()
			event.preventDefault()
		)

)

# Track Social Likes activity
_doc.on('popup_opened.social-likes', (event, service, win) ->
    ga('send', 'social', service, 'share', location.href)
)
