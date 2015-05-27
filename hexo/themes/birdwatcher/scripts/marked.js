'use strict';

var marked = require('marked');
var MarkedRenderer = marked.Renderer;

function Renderer() {
	MarkedRenderer.apply(this, arguments);
}

require('util').inherits(Renderer, MarkedRenderer);

// Replace URL for photos and uploads
Renderer.prototype.image = function(href, title, text) {
	var get_photo_url = hexo.extend.helper.get('get_photo_url');
	title = title || '';
	text = text || '';

	var m = href.match(/^(\w+):\/\/(.*)$/);
	if (m) {
		var protocol = m[1];
		var id = m[2];
		switch (protocol) {
			case 'photo':
				if (!hexo.config.photos[id]) console.log('WARNING: photo with ID ' + id + ' not found');
				href = get_photo_url(hexo.config.photos[id], 'large');
				break;
			case 'upload':
				if (!hexo.config.uploads[id]) console.log('WARNING: upload with URL ' + id + ' not found');
				href = get_photo_url(hexo.config.uploads[id], 'large');
				break;
		}
	}

	return [
		'<figure class="entry-photo">' +
			'<img src="', href, '" alt="', text, '" title="', title, '" class="entry-photo__photo">' +
		'</figure>'
	].join('');
};

// Do not wrap images in <p>
Renderer.prototype.paragraph = function(text) {
	if (/^\s*<figure/.test(text)) {
		return text + '\n';
	}
	else {
		return '<p>' + text + '</p>\n';
	}
};

function renderer(data) {
	return marked(data.text, {
		renderer: new Renderer()
	});
};

hexo.extend.renderer.register('md', 'html', renderer, true);
