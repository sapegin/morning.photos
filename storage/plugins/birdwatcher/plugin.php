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
		$essay = $this->process_html($essay, 'process_html_essay');
		$essay = $this->process_photos($essay);

		$essay->removeClass('bw-essay');

		return $html;
	}

	function process_essay_excerpt($essay)
	{
		$essay = $this->process_html($essay, 'process_html_essay_excerpt');
		$essay = $this->process_photos($essay);

		$type = $essay->type;
		if ($type === 'photo') {
			// Move first photo before header
			$first = $essay('.entry-photo', 0);
			if ($first) {
				$first->changeParent($essay('.essay__featured', 0));
			}
		}
		
		$essay->removeClass('bw-essay-excerpt');
		$essay->deleteAttribute('url');
		$essay->deleteAttribute('type');

		return $essay;
	}

	function process_html($entry, $callback)
	{
		$html_str = $entry->html();

		$html_str = call_user_func(array($this, $callback), $html_str, $entry);

		// It probably should be setOuterText, but it don't work
		$entry->setInnerText($html_str);
		$first = $entry->firstChild(true)->detach(true);

		return $entry;
	}

	function process_html_essay($html_str, $entry)
	{
		$html_str = $this->process_lj($html_str, $entry);
		return $html_str;
	}

	function process_html_essay_excerpt($html_str, $entry)
	{
		$html_str = $this->process_more($html_str, $entry);
		$html_str = $this->process_lj($html_str, $entry);
		return $html_str;
	}

	// More tag
	function process_more($html_str, $entry)
	{
		$url = $entry->url;

		$parts = explode('<!--more-->', $html_str);
		$html_str = $parts[0];
		if (count($parts) > 1) {
			$html_str .= '<p class="more-link"><a class="more-link__link" href="' . $url . '">Читать дальше…</a></p>';
		}

		return $html_str;
	}

	// LJ tags
	// <lj user="pavel_kosenko">
	// <lj comm="hamster_photo">
	function process_lj($html_str, $entry)
	{
		// <lj user="">: short links
		$html_str = preg_replace('%\[lj user="([a-z0-9](?:[_a-z0-9]*[a-z0-9]))"\]%e', "'<a href=\"http://'.str_replace('_','-','\\1').'.livejournal.com/\" class=\"lj-link\">\\1</a>'", $html_str);

		// <lj user="">, <lj comm=""> и <lj syn="">
		$html_str = preg_replace('%\[lj (user|comm|syn)="([_a-z0-9]+)"\]%', '<a href=\"http://\\1s.livejournal.com/\\2/\" class=\"lj-link\">\\2</a>', $html_str);
		
		// Fix links
		$html_str = str_replace('comms.livejournal.com', 'community.livejournal.com', $html_str);
		$html_str = str_replace('syns.livejournal.com', 'syndicated.livejournal.com', $html_str);

		return $html_str;
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