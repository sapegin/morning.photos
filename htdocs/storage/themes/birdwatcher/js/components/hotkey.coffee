# Author: Artem Sapegin, http://sapegin.me, 2014
#
# <a href="{{ album.url }}" data-component="hotkey" data-hotkey="esc">

'use strict'

$ = jQuery
_doc = $(document)

keys = {
	esc: 27
}

elems_map = {}
inited = false


init_handler = ->
	_doc.on('keydown', (event) ->
		keycode = event.which
		elems = elems_map[keycode]
		return  unless elems

		event.preventDefault()
		for elem in elems
			url = elem.attr('href')
			location.href = url  if url
	)


tamia.initComponents(
	'hotkey': (elem) ->
		elem = $(elem)

		hotkey = elem.data('hotkey')
		keycode = keys[hotkey]
		elems_map[keycode] ?= []
		elems_map[keycode].push(elem)

		init_handler()  unless inited
)
