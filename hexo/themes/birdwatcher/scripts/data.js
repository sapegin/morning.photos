'use strict';

var fs = require('fs');
var YAML = require('yamljs');

var photos = JSON.parse(fs.readFileSync('../scripts/data/photos.json'))
var uploads = JSON.parse(fs.readFileSync('../scripts/data/uploads.json'))
var featured = JSON.parse(fs.readFileSync('../scripts/data/featured.json'))

var books = YAML.load('misc/books.yml');
var booksPubDate = fs.statSync('misc/books.yml').mtime;
var quotes = YAML.load('misc/quotes.yml');

hexo.extend.helper.register('get_photo_url', function(tpl, size) {
	return hexo.config.photo_prefix + tpl.replace('{size}', size);
});

// Prepare featured images for Fotorama
hexo.config.featured = featured.map(function(url) { 
	return {img: hexo.extend.helper.get('get_photo_url')(url, 'xlarge')};
});

// Expose
hexo.config.photos = photos;
hexo.config.uploads = uploads;
hexo.config.books = books;
hexo.config.quotes = quotes;
hexo.config.books_pub_date = booksPubDate;
