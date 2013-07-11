# DocPad Configuration File
# http://docpad.org/docs/config

YAML = require 'yamljs'
moment = require 'moment'
marked = require 'marked'
richtypo = require 'richtypo'

docpadConfig = {

	templateData:

		tags:
			best: 'Лучшие'
			good: 'Хорошие'
			russian: 'На русском'
			english: 'На английском'

		partners:
			'amazon.com': '?tag=artesapesphot-20'
			'ozon.ru': '?partner=sapegin'

		# Adds partner ID to link
		buyLink: (url) ->
			for partner, suffix of @partners
				if url.indexOf(partner) isnt -1
					return url + suffix
			return url

		# Localized date
		pubDate: (date) ->
			moment(date).format('LL')

		# List of clases for review tags
		tags_classes: (list, prefix) ->
			return '' unless list
			("#{prefix}_#{tag}" for tag in list).join ' '

		# Typography
		rt: (s) ->
			s and (richtypo.rich s)

		# Markdown
		md: (s) ->
			s and (marked s)

	events:
		generateBefore: (opts) ->
			@docpad.getConfig().templateData.books = (YAML.load 'src/books.yml')
			moment.lang 'ru'

}

module.exports = docpadConfig