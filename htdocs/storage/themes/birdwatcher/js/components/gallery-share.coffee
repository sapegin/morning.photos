# Author: Artem Sapegin, http://sapegin.me, 2014

'use strict'

$ = jQuery
_doc = $(document)


class GalleryShare extends Component
	init: ->
		_doc.on('photochanged', @update.bind(this))
		@titleTemplate = @elem.data('title-template')

	update: (event, frame) ->
		@elem.socialLikes({
			title: tamia.stmpl(@titleTemplate, {title: frame.title})
			url: frame.permalink
			data: {
				media: frame.img.replace(',xlarge.jpg', ',medium_large.jpg')
			}
		})


tamia.initComponents({'gallery-share': GalleryShare})
