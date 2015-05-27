'use strict';

var pagination = require('hexo-pagination');

function blog(locals) {
	var posts = locals.posts.sort('-date');

	return pagination('blog/', posts, {
		perPage: this.config.per_page,
		layout: 'blog'
	});
}

function tags(locals) {
	var perPage = this.config.per_page;

	return locals.tags.reduce(function(result, tag){
		if (!tag.length) {
			return result;
		}

		var posts = tag.posts.sort('-date');
		var data = pagination(tag.path, posts, {
			perPage: perPage,
			layout: ['tag', 'blog'],
			data: {
				tag: tag.name
			}
		});

		return result.concat(data);
	}, []);
}

hexo.extend.generator.register('blog', blog);
hexo.extend.generator.register('tags', tags);
