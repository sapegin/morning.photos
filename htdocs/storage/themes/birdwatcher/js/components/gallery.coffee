# Author: Artem Sapegin, http://sapegin.me, 2014

'use strict'

$ = jQuery
_win = $(window)
_doc = $(document)


class Gallery extends Component
	init: ->
		@photos = window.__photos
		@siteTitle = $('meta[property="og:site_name"]').attr('content')
		@urlRegExp = /\/photos\/(\d+)\/$/

		currentId = window.__photos_current_id
		startIndex = @idToIndex(currentId)

		@gallery = @find('gallery')
		@prevButton = @find('prev')
		@nextButton = @find('next')

		@gallery.fotorama({
			nav: false
			keyboard: true
			transition: 'crossfade'
			width: '100%'
			height: @gallery.height()
		})

		@fotorama = @gallery.data('fotorama')
		@fotorama.load(@photos)
		@fotorama.show({index: startIndex, time: 0})
		@gallery.on('fotorama:show', @update.bind(this))

		@on('click', 'prev', @prev)
		@on('click', 'next', @next)
		@updateNav()

		_win.resize(@resize.bind(this))

		_win.on('popstate', (event) =>
			m = window.location.href.match(@urlRegExp)
			id = m?[1]
			return  if not id or id is currentId
			@fotorama.show({index: @idToIndex(id)})
		)

	update: ->
		frame = @fotorama.activeFrame
		frame.title = frame.info.title or '***'

		# Update URL
		permalink = location.href.replace(@urlRegExp, "/photos/#{frame.id}/")
		history.pushState('', frame.title, permalink)

		# Update page title
		document.title = tamia.tmpl('photo-title', {
			title: frame.title
			siteTitle: @siteTitle
		})

		@updateNav()

		_doc.trigger('photochanged', frame)

	next: ->
		return  if @isLast()
		@fotorama.show('>')
		@updateNav()

	prev: ->
		return  if @isFirst()
		@fotorama.show('<')
		@updateNav()

	isFirst: ->
		return @fotorama.activeIndex is 0

	isLast: ->
		return @fotorama.activeIndex is @fotorama.data.length-1

	updateNav: ->
		@prevButton.toggleClass('is-disabled', @isFirst())
		@nextButton.toggleClass('is-disabled', @isLast())

	resize: ->
		@fotorama.resize({
			width: @gallery.width()
			height: @gallery.height()
		})

	idToIndex: (id) ->
		index = null
		$.each(@photos, (idx, val) =>
			if @photos[idx].id is id
				index = idx
				return false
		)
		return index


tamia.initComponents({'gallery': Gallery})
