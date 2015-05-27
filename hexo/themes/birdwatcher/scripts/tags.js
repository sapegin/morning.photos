'use strict';

hexo.extend.tag.register('video', function(args) {
	var videoUrl = args[0];
	var videoHeight = args[1] || 576;

	return '<div class="entry-video">' +
			'<iframe class="entry-video__video" width="1024" height="' + videoHeight + '" src="' + videoUrl + '" frameborder="0" allowfullscreen></iframe>' +
		'</div>'
	;
});
