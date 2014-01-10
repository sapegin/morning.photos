# Author: Artem Sapegin, http://sapegin.me, 2014

'use strict'

$ = jQuery
_doc = $(document)


class GalleryInfo extends Component
	init: ->
		_doc.on('photochanged', @update.bind(this))

	update: (event, frame) ->
		@elem.tmpl('photo-info', frame)


tamia.initComponents({'gallery-info': GalleryInfo})
