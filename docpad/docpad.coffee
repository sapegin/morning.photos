# DocPad Configuration File
# http://docpad.org/docs/config

fs = require 'fs'
_ = require 'lodash'
YAML = require 'yamljs'
moment = require 'moment'
marked = require 'marked'
richtypo = require 'richtypo'


photoPrefix = 'http://birdwatcher.ru/'
photos = JSON.parse(fs.readFileSync('../scripts/data/photos.json'))
uploads = JSON.parse(fs.readFileSync('../scripts/data/uploads.json'))

docpadConfig = {

	templateData:

		books: YAML.load('src/books.yml')
		booksPubDate: fs.statSync('src/books.yml').mtime
		quotes: YAML.load('src/quotes.yml')

		siteTitle: 'Фотографии Артёма Сапегина'
		blogTitle: 'Блог о фотографии Артёма Сапегина'
		siteDescription: 'Пейзаж, городской пейзаж, путешествия, тревел, природа, собаки.'

		themePath: '../htdocs/storage/themes/birdwatcher'

		cutTag: '<!--more-->'

		nav:
			'/blog/': 'Блог'
			'/albums/': 'Фотографии'
			'/travel/': 'Поездки'
			'/learn/': 'Статьи'
			'/about/': 'Обо мне'

		tags:
			best: 'Лучшие'
			good: 'Хорошие'
			russian: 'На русском'
			english: 'На английском'
			available: 'Ещё продаются'

		tagNames:
			photos: 'Фотографии'
			photography: 'О фотографии'
			life: 'Жизнь'
			geeky: 'Гиковское'
			idiots: 'Идиоты'
			dogs: 'Собаки'
			books: 'Книги'
			horses: 'Лошади'
			masters: 'Мастера'
			humor: 'Юмор'

		partners:
			'amazon.com': '?tag=artesapesphot-20'
			'ozon.ru': '?partner=sapegin'

		# Page title
		pageTitle: ->
			if @documentUrl() is '/'
				"#{@siteTitle} — пейзаж, городской пейзаж, путешествия, тревел, природа, собаки, фото"
			else if @document.title
				if @isPost()
					"#{@document.title} — #{@blogTitle}"
				else
					"#{@document.title} — #{@siteTitle}"
			else
				@siteTitle

		# Page description
		pageDescription: ->
			@document.description or @siteDescription

		bodyClass: ->
			if @document.pageType
				"page page_#{@document.pageType}"
			else
				"page"

		embedFile: _.memoize (filepath) ->
			fs.readFileSync("#{@themePath}/#{filepath}", encoding: 'utf8')

		fingerprint: _.memoize (filepath) ->
			datetime = fs.statSync("#{@themePath}/#{filepath}").mtime.getTime()
			"#{filepath}?#{datetime}"

		documentUrl: ->
			@document.url.replace('/ru', '')

		isIndex: ->
			@documentUrl() is '/'

		isPost: ->
			/\/blog\//.test(@documentUrl())

		# Adds partner ID to link
		buyLink: (url) ->
			for partner, suffix of @partners
				if url.indexOf(partner) isnt -1
					return url + suffix
			return url

		# Localized date
		pubDate: (date) ->
			moment(date).format('LL')  # December 23 2013

		tagUrl: (tag) ->
			"/blog/categories/#{tag}"

		# List of clases for review tags
		tags_classes: (list, prefix) ->
			return '' unless list
			("#{prefix}_#{tag}" for tag in list).join ' '

		absolutizeLinks: (s) ->
			s and (s.replace /href="#/g, 'href="http://birdwatcher.ru/reading/#')

		# Typography
		rt: (s) ->
			s and (richtypo.rich s)

		# Richtypo.js: title
		rtt: (s) ->
			s and (richtypo.title s)

		# Markdown
		md: (s) ->
			s and ((marked s)
				.replace(/«<a([^>]+>)([^<]*)(<\/a>)»/g, '<a class="link_quoted"$1«<u>$2</u>»$3')  # Tweak quoted links
				)

		# Markdown string
		mds: (s) ->
			s and ((marked s)
				.replace(/^\s*<p>/, '')
				.replace(/<\/p>\s*$/, '')
				)

		cleanMd: (s) ->
			s and (s
				.replace(/<br>\s+/g, '<br>')
				.replace(/<\/?code>/g, '`')
				.replace(/\s--?/g, ' —')
				.replace(/\\(\d)/g, '$1')
				)
	plugins:
		tags:
			extension: '.html'
			# injectDocumentHelper: (document) ->
			# 	document.setMeta(
			# 		layout: 'tags'
			# 	)
		marked:
			markedRenderer:
				image: (href, title, text) ->
					# Replace URL for photos and uploads
					m = href.match(/^(\w+):\/\/(.*)$/)
					if m
						protocol = m[1]
						id = m[2]
						switch protocol
							when 'photo'
								href = photoPrefix + photos[id].replace('{size}', 'large')
							when 'upload'
								href = photoPrefix + uploads[id].replace('{size}', 'large')

					out = "<img src=\"#{href}\" alt=\"#{text}\"";
					out += " title=\"#{title}\""  if title
					return "#{out}>"

	events:
		generateBefore: (opts) ->
			moment.locale 'ru'

}

module.exports = docpadConfig
