<?php

class Birdwatcher extends KokenPlugin {

	function __construct()
	{
		$this->register_filter('site.output', 'awesomize');
	}

	function awesomize($html)
	{
		if (strpos($html, 'bw-content') === false) return $html;

		$content = null;
		preg_match('%<!-- bw-content -->(.*?)<!-- /bw-content -->%s', $html, $content);
		$content = $content[1];

		// Some cleanup
		$content = preg_replace('%</?noscript>%', '', $content);
		$content = preg_replace('%<img data-alt=[^>]+/>%', '', $content);
		$content = preg_replace('%<div class="k-content">(.*?)</div>%s', '\1', $content);

		// 
		$chunks = null;
		if (preg_match_all('%(<div class="k-content-embed">.*?</div>|<p.*?</p>)%s', $content, $chunks)) {
			$chunks = $chunks[0];
			$inside = 'text';
			for ($chunkIdx = 0; $chunkIdx < count($chunks); $chunkIdx++) {
				$chunk = $chunks[$chunkIdx];
				if (strpos($chunk, '<div class="k-content-embed">') === 0) {
					if (strpos($chunk, 'class="k-media-img"') !== false) {
						// Uploaded photo
						$chunk = str_replace('k-content-embed', 'page-photo', $chunk);
						$chunk = str_replace('k-media-img', 'page-photo__photo', $chunk);
					}
					else {
						if (strpos($chunk, '<a href="/photos/') !== false) {
							// Normal photo
							$chunk = str_replace('k-content-embed', 'page-photo', $chunk);
							$chunk = str_replace('<img width="100%"', '<img class="page-photo__photo"', $chunk);
							$chunk = str_replace('/lightbox/', '/', $chunk);
							$chunk = str_replace(' lightbox="true"', '', $chunk);
							$inside = 'photo';
						}
						else {
							// Instagram
							if ($inside !== 'instagram') {
								$chunk = str_replace('k-content-embed', 'page-instagrams', $chunk);
								$inside = 'instagram';
							}
							else {
								$chunk = str_replace('<div class="k-content-embed">', '', $chunk);
							}
							$chunk = str_replace('<img width="100%"', '<div class="page-instagrams__item"><img class="page-instagrams__photo"', $chunk);
							$chunk = str_replace(',large.', ',medium.', $chunk);
							$chunk = preg_replace("%[\n\r\t]+%s", '', $chunk);
						}
					}
				}
				else {
					// Text
					if ($inside === 'instagram') {
						$chunk = "</div>\n$chunk";
					}
					$inside = 'text';
				}
				$chunks[$chunkIdx] = $chunk;
			}
		}

		$html = preg_replace('%<!-- bw-content -->(.*?)<!-- /bw-content -->%s', implode('', $chunks), $html);

		return $html;
	}
}