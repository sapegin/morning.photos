<?php

class Birdwatcher extends KokenPlugin {

	function __construct()
	{
		$this->register_filter('site.output', 'awesomize');
	}

	function awesomize($html_str)
	{
		require_once 'lib/ganon.php';
		$html = str_get_dom($html_str);
		$html = $this->process_page($html);
		$html = $this->process_essays($html);
		return (string)$html;
	}

	function process_page($html)
	{
		foreach ($html('.bw-page') as $page) {
			$page = $this->process_photos($page);
			$page->removeClass('bw-page');
		}

		return $html;
	}

	function process_essays($html)
	{
		foreach ($html('.bw-essay-excerpt') as $essay) {
			$essay = $this->process_essay_excerpt($essay);
		}

		foreach ($html('.bw-essay') as $essay) {
			$essay = $this->process_essay($essay);
		}

		return $html;
	}

	function process_essay($essay)
	{
		$essay = $this->process_photos($essay);

		$essay->removeClass('bw-essay');

		return $html;
	}

	function process_essay_excerpt($essay)
	{
		$essay = $this->process_more($essay);
		$essay = $this->process_photos($essay);

		$type = $essay->type;
		if ($type === 'photo') {
			// Move first photo before header
			$first = $essay('.entry-photo', 0);
			$first->changeParent($essay('.essay__featured', 0));
		}

		$essay->removeClass('bw-essay-excerpt');
		$essay->deleteAttribute('url');
		$essay->deleteAttribute('type');

		return $essay;
	}

	// More tag
	function process_more($entry)
	{
		$url = $entry->url;
		$html_str = $entry->html();

		$parts = explode('<!--more-->', $html_str);
		$html_str = $parts[0];
		if (count($parts) > 1) {
			$html_str .= '<p class="more-link"><a class="more-link__link" href="' . $url . '">Читать дальше…</a></p>';
		}

		// It probably should be setOuterText, but it don't work
		$entry->setInnerText($html_str);
		$first = $entry->firstChild(true)->detach(true);

		return $entry;
	}

	function process_photos($content)
	{
		$ig_wrapper = null;

		foreach ($content('.k-content-embed') as $embed) {
			$embed->class = 'entry-photo';
			
			$content_div = $embed('.k-content', 0);
			if ($content_div) {
				$content_div->detach(true);
			}
			
			$noscript = $embed('noscript', 0);
			if ($noscript) {
				$noscript->delete();
			}

			// Uploaded photo
			$img = $embed('.k-media-img', 0);
			if ($img) {
				$img->class = 'entry-photo__photo';
				$img->deleteAttribute('style');

				$text = $embed('.k-content-text', 0);
				if ($text) {
					$text->class = 'entry-photo__text';
				}

				$title = $embed('.k-content-title', 0);
				if ($title) {
					$title->class = 'entry-photo__title';
				}

				continue;
			}

			// Normal photo
			$link = $embed('a[href*="/photos/"]', 0);
			if ($link) {
				$link->href = str_replace('/lightbox/', '/', $link->href);
				$link->class = 'entry-photo__link';
				$link->deleteAttribute('lightbox');

				$this->process_img($embed('img', 0), 'entry-photo', 'large');

				continue;
			}

			// Instagram
			$embed->class = 'entry-instagrams__item';
			$this->process_img($embed('img', 0), 'entry-instagrams', 'medium');

			// Instagram wrapper
			if ($this->prev($embed)->class !== 'entry-instagrams') {
				// First Instargam image in set
				$ig_wrapper = $embed->wrap('div');
				$ig_wrapper->class = 'entry-instagrams';
			}
			else {
				$embed->changeParent($ig_wrapper);
			}
		}

		return $content;
	}

	function process_img($img, $block, $size)
	{
		$base = '';
		$extension = '';
		foreach($img->attributes as $attr => $value) {
			switch ($attr) {
				case 'data-alt':
					$img->alt = $value;
					break;
				case 'data-base':
					$base = $value;
					break;
				case 'data-extension':
					$extension = $value;
					break;
			}
			$img->deleteAttribute($attr);
		}
		$img->src = "$base,$size.$extension";
		$img->class = "{$block}__photo";

		return $img;
	}

	function prev($node)
	{
		$sibling = $node;
		while (true) {
			$sibling = $sibling->getSibling(-1);
			if (!$sibling || $sibling->getTag() !== '~text~') {
				return $sibling;
			}
		}
		return null;
	}
}