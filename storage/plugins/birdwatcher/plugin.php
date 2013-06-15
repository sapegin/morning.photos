<?php

class Birdwatcher extends KokenPlugin {

	function __construct()
	{
		$this->register_filter('site.output', 'awesomize');
	}

	function awesomize($html)
	{
		$html = $this->process_page($html);
		$html = $this->process_essays($html);
		return $html;
	}

	function process_page($html)
	{
		if (strpos($html, 'bw-content') === false) return $html;

		$content = null;
		preg_match('%<!-- bw-content -->(.*?)<!-- /bw-content -->%s', $html, $content);
		$content = $content[1];

		$content = $this->process_photos($content);

		$html = preg_replace('%<!-- bw-content -->(.*?)<!-- /bw-content -->%s', $content, $html);

		return $html;
	}

	function process_essays($html)
	{
		if (strpos($html, 'bw-essay') === false) return $html;

		$html = preg_replace_callback('%<!-- bw-essay -->(.*?)<!-- /bw-essay -->%s', array($this, 'process_essay'), $html);
		$html = preg_replace_callback('%<!-- bw-essay-excerpt url="([^"]*)" -->(.*?)<!-- /bw-essay-excerpt -->%s', array($this, 'process_essay_excerpt'), $html);
		$html = preg_replace_callback('%<!-- bw-essay-photo-excerpt url="([^"]*)" -->(.*?)<!-- /bw-essay-photo-excerpt -->%s', array($this, 'process_essay_photo_excerpt'), $html);

		return $html;
	}

	function process_essay($data)
	{
		$html = $data[1];

		return $html;
	}

	// More tag
	function process_more($html)
	{
		$parts = explode('<!--more-->', $html);
		$html = $parts[0];
		if (count($parts) > 1) {
			$html .= '<p class="more-link"><a class="more-link__link" href="' . $url . '">Читать дальше…</a></p>';
		}
		return $html;
	}

	function process_essay_excerpt($data)
	{
		$url = $data[1];
		$html = $data[2];

		$html = $this->process_more($html);
		$html = $this->process_photos($html);

		return $html;
	}

	function process_essay_photo_excerpt($data)
	{
		$html = $this->process_essay_excerpt($data);

		// Enlarge photos
		// $html = str_replace(',large.', ',xlarge.', $html);

		// Move first photo before header
		$first = null;
		preg_match('%<div class="entry-photo">(.*?)</div>%s', $html, $first);
		$first = $first[1];
		$html = preg_replace('%<div class="entry-photo">.*?</div>%s', '', $html);
		$html = "<div class=\"entry-photo entry-photo_featured\">$first</div>\n<div class=\"essay__content text\">$html</div>";

		return $html;
	}

	function process_photos($html)
	{
		// Some cleanup
		$html = preg_replace('%</?noscript>%', '', $html);
		$html = preg_replace('%<img data-alt=[^>]+/>%', '', $html);
		$html = preg_replace('%<div class="k-content">(.*?)</div>%s', '\1', $html);

		$chunks = null;
		if (preg_match_all('%(<div class="k-content-embed">.*?</div>|<p.*?</p>|<h2.*?</h2>)%s', $html, $chunks)) {
			$chunks = $chunks[0];
			$inside = 'text';
			for ($chunkIdx = 0; $chunkIdx < count($chunks); $chunkIdx++) {
				$chunk = $chunks[$chunkIdx];
				if (strpos($chunk, '<div class="k-content-embed">') === 0) {
					if (strpos($chunk, 'class="k-media-img"') !== false) {
						// Uploaded photo
						$chunk = str_replace('k-content-embed', 'entry-photo', $chunk);
						$chunk = str_replace('k-media-img', 'entry-photo__photo', $chunk);
					}
					else {
						if (strpos($chunk, '<a href="/photos/') !== false) {
							// Normal photo
							$chunk = str_replace('k-content-embed', 'entry-photo', $chunk);
							$chunk = str_replace('<img width="100%"', '<img class="entry-photo__photo"', $chunk);
							$chunk = str_replace('/lightbox/', '/', $chunk);
							$chunk = str_replace(' lightbox="true"', '', $chunk);
							$inside = 'photo';
						}
						else {
							// Instagram
							if ($inside !== 'instagram') {
								$chunk = str_replace('k-content-embed', 'entry-instagrams', $chunk);
								$inside = 'instagram';
							}
							else {
								$chunk = str_replace('<div class="k-content-embed">', '', $chunk);
							}
							$chunk = str_replace('<img width="100%"', '<div class="entry-instagrams__item"><img class="entry-instagrams__photo"', $chunk);
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

			return implode('', $chunks);
		}

	}
}