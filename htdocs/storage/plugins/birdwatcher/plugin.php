<?php

class Birdwatcher extends KokenPlugin {
	public $thumb_height = 300;

	function __construct()
	{
		$this->register_filter('api.text', 'filter_text');
		$this->register_filter('site.output', 'filter_output');
	}

	function filter_text($data)
	{
		// Entry type: page, essay or essay_excerpt
		$type = $data['page_type'];
		if ($type === 'essay' && $this->is_text_list()) {
			$type .= '_excerpt';
		}

		// Simple text processing
		$data['content'] = call_user_func(array($this, "process_html_$type"), $data['content'], $data['url']);

		return $data;
	}

	function filter_output($html_str)
	{
		$html_str = $this->clean_koken($html_str);
		$html_str = $this->fix_rss_links($html_str);
		$html_str = $this->common_typo($html_str);
		$html_str = $this->process_entries($html_str);
		$html_str = $this->process_rss($html_str);
		$html_str = $this->process_thumbs($html_str);
		return $html_str;
	}

	function clean_koken($html_str)
	{
		// Remove Koken’s shit from page header
		$html_str = preg_replace('%<script src="//ajax.googleapis.com/ajax/libs/jquery/.*?}\);</script>%sm', '', $html_str);
		$html_str = preg_replace('%<!\-\-\[if IE\]>\s*<script src=".*?/html5shiv.js"></script>\s*<!\[endif\]\-\->%sm', '', $html_str);

		return $html_str;
	}

	function fix_rss_links($html_str)
	{
		$html_str = str_replace(
			'<link rel="alternate" type="application/atom+xml" title="Artem Sapegin Photography: All uploads" href="/feed/content/recent.rss" />',
			'',
			$html_str
		);
		$html_str = str_replace(
			'<link rel="alternate" type="application/atom+xml" title="Artem Sapegin Photography: Essays" href="/feed/essays/recent.rss" />',
			'<link rel="alternate" type="application/atom+xml" title="Artem Sapegin’s Photography Blog" href="/feed/" />',
			$html_str
		);
		$html_str = str_replace(
			'<link rel="alternate" type="application/atom+xml" title="Artem Sapegin Photography: Timeline" href="/feed/timeline/recent.rss" />',
			'<link rel="alternate" type="application/atom+xml" title="Artem Sapegin Photography" href="/feed/timeline/recent.rss" />',
			$html_str
		);

		return $html_str;
	}

	function common_typo($html_str)
	{
		$html_str = preg_replace_callback('%(<h[1-6] class="entry-title">)(.*?)(</h[1-6]>)%sm', array($this, 'typo_title'), $html_str);

		return $html_str;
	}

	function typo_title($m)
	{
		return $m[1] . $this->typo_process($m[2]) . $m[3];
	}

	function process_html_page($html_str, $url)
	{
		$html_str = $this->typo_process($html_str);
		return $html_str;
	}

	function process_html_essay($html_str, $url)
	{
		$html_str = $this->typo_process($html_str);
		return $html_str;
	}

	function process_html_essay_excerpt($html_str, $url)
	{
		$html_str = $this->process_more($html_str, $url);
		$html_str = $this->typo_process($html_str);
		return $html_str;
	}

	// More tag
	function process_more($html_str, $url)
	{
		$parts = explode('<!--more-->', $html_str);
		if (count($parts) > 1) {
			$html_str = $parts[0] .
				'<!--more_open--><div class="js-more">' .
					'<p class="more-link"><a class="more-link__link js-more-link" href="' . $url . '">Read more…</a></p>' .
					'<div class="js-more-content is-hidden"><!--/more_open-->' . $parts[1] . '<!--more_close--></div>' .
				'</div><!--/more_close-->'
			;
		}

		return $html_str;
	}

	function process_entries($html_str)
	{
		if (strpos($html_str, 'bw-entry') === false) return $html_str;

		require_once 'lib/ganon.php';
		$doc = str_get_dom($html_str);
		foreach ($doc('.bw-entry') as $entry) {
			$type = $entry->getAttribute('entry-type');
			$entry->removeClass('bw-entry');
			$entry->deleteAttribute('entry-type');

			$entry = $this->process_photos($entry);

			// Extra processing, if needed for this entry type
			$func = array($this, "process_$type");
			if (is_callable($func)) {
				$entry = call_user_func($func, $entry);
			}
		}
		return (string)$doc;
	}

	function process_rss($html_str)
	{
		if (strpos($html_str, '<rss version="2.0"') === false) return $html_str;

		header('Content-type: text/xml');

		$html_str = preg_replace('%</?noscript>%', '', $html_str);
		$html_str = preg_replace('%<img width="100\%"%', '<img', $html_str);
		$html_str = preg_replace('%<img data-alt=[^>]+>%', '', $html_str);
		$html_str = preg_replace('%(<a href="/photos/\d+/)lightbox/%', '\\1', $html_str);
		$html_str = preg_replace('%<a href="/%', '<a href="http://' . $_SERVER['HTTP_HOST'] . '/', $html_str);

		// Restore more tag
		$html_str = preg_replace('%<!--more_open-->.*?<!--/more_open-->%sm', '<!--more-->', $html_str);
		$html_str = preg_replace('%<!--more_close-->.*?<!--/more_close-->%sm', '', $html_str);

		// Fix images
		$html_str = preg_replace('%<figure class="k-content-embed">\s*<div class="k-content">\s*(.*?)\s*</div>\s*</figure>%sm', '<p>\\1</p>', $html_str);

		return $html_str;
	}

	function process_thumbs($html_str)
	{
		if (strpos($html_str, 'bw-thumb') === false) return $html_str;

		require_once 'lib/ganon.php';
		$doc = str_get_dom($html_str);
		foreach ($doc('.bw-thumb') as $thumb) {
			$thumb->removeClass('bw-thumb');
			$thumb = $this->process_thumb($thumb);
		}
		return (string)$doc;
	}

	function process_thumb($thumb)
	{
		$noscript = $thumb('noscript', 0);
		if ($noscript) {
			$noscript->delete();
		}

		$img = $thumb('img', 0);
		if (!$img) continue;

		// Image height should be at least 300px
		$thumb_size = 'medium';
		$size = $this->get_image_size($img, $thumb_size);
		if ($size[1] < $this->thumb_height) {
			$thumb_size = 'large';
		}

		// Recalculate width to match 300px height
		$this->process_img($img, $img->class, $thumb_size);
		$img->width = round($this->thumb_height/$size[1]*$size[0]);
		$img->height = $this->thumb_height;

		return $thumb;
	}

	function process_essay_excerpt($essay)
	{
		$essay_type = $essay->type;
		if ($essay_type === 'photo') {
			// Move first photo before header
			$first = $essay('.entry-photo', 0);
			if ($first) {
				$first->changeParent($essay('.essay__featured', 0));
			}
		}
		$essay->deleteAttribute('type');

		return $essay;
	}

	function process_photos($entry)
	{
		$ig_wrapper = null;
		$prev_embed = null;
		$prev_img = null;
		$prev_ratio = null;

		foreach ($entry('.k-content-embed') as $embed) {
			$noscript = $embed('noscript', 0);
			if ($noscript) {
				$noscript->delete();
			}

			$img = $embed('img', 0);
			if (!$img) {
				$embed->class = 'entry-embed';
				continue;
			}

			$embed->class = 'entry-photo';
			$base = $img->getAttribute('data-base');

			$content_div = $embed('.k-content', 0);
			if ($content_div) {
				$content_div->detach(true);
			}

			$text = $embed('.k-content-text', 0);
			if ($text) {
				$text->class = 'entry-photo__text';
			}

			$title = $embed('.k-content-title', 0);
			if ($title) {
				$title->class = 'entry-photo__title';
			}

			if ($base) {
				// Instagram
				if (strpos($base, 'IG-') !== false) {
					$embed->class = 'entry-instagrams__item';
					$this->process_img($embed('img', 0), 'entry-instagrams__photo', 'medium');

					// Instagram wrapper
					if ($this->prev($embed)->class !== 'entry-instagrams') {  // First Instargam image in set
						$ig_wrapper = $embed->wrap('div');
						$ig_wrapper->class = 'entry-instagrams';
					}
					else {
						$embed->changeParent($ig_wrapper);
					}
					$prev_ratio = null;
				}
				// Library photo
				else {
					$img_size = 'large';
					$size = $this->get_image_size($img);
					// Vertical or square
					if ($size[1] >= $size[0]) {
						$ratio = $this->get_image_ratio($size);
						// Same ratio and direct siblings
						if ($ratio === $prev_ratio && $this->prev($embed) === $prev_embed) {
							// Place two vertical or square photos of the same ratio in a row
							$wrapper = $prev_embed->wrap('div');
							$wrapper->class = 'l-row';
							$prev_embed->addClass('l-half');
							$embed->addClass('l-half');
							$embed->changeParent($wrapper);

							// Decrease image sizes by one step
							$img_size = 'medium_large';
							$prev_img->src = str_replace(',large.', ",$img_size.", $prev_img->src);
							$prev_img->width = $size[0];
							$prev_img->height = $size[1];

							$prev_ratio = null;
						}
						else {
							$prev_ratio = $ratio;
						}
					}

					$this->process_img($img, 'entry-photo__photo', $img_size);

					$link = $embed('a[href*="/photos/"]', 0);
					if ($link) {
						$link->href = str_replace('/lightbox/', '/', $link->href);
						$link->class = 'entry-photo__link';
						$link->deleteAttribute('lightbox');
					}
				}
			}

			$prev_embed = $embed;
			$prev_img = $img;
		}

		return $entry;
	}

	function get_image_size($img, $preset='medium_large')
	{
		$presets = $img->getAttribute('data-presets');
		$m = null;
		preg_match("%\b$preset,(\d+),(\d+)%", $presets, $m);
		return [intval($m[1]), intval($m[2])];
	}

	function get_image_ratio($sizes)
	{
		return round($sizes[0]/$sizes[1]*100) / 100;
	}

	function process_img($img, $class, $preset)
	{
		$size = $this->get_image_size($img, $preset);
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
		$img->src = "$base$preset.$extension";
		$img->width = $size[0];
		$img->height = $size[1];
		$img->class = $class;

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

	/**
	 * Check if we’re on essays list.
	 */
	function is_text_list()
	{
		return strpos($_SERVER['REQUEST_URI'], '/limit:') !== false;
	}

	function typo_backup_tags($s)
	{
		$this->typo_tags[] = $s[1];
		return '<≈>';
	}

	function typo_restore_tags($s)
	{
		$this->typo_tags;
		return array_shift($this->typo_tags);
	}

	/**
	 * Typography.
	 *
	 * Based on https://github.com/sapegin/wp-typohelper
	 */
	function typo_process($s)
	{
		// Remove tabs
		$s = str_replace("\t", '', $s);

		// Remove multiple spaces
		$s = preg_replace('% +%', ' ', $s);

		// Fix non-breaking spaces
		$s = str_replace(' ', '&nbsp;', $s);

		// Preserve tags
		$s = preg_replace_callback('%(<[^>]*>)%ums', array($this, 'typo_backup_tags'), $s);

		// Em-dash
		$s = preg_replace('%\s([—–])\s%u', '&#8202;—&#8202;', $s);
		$s = preg_replace('%(\w+[—–])(\w)%u', '<nobr>\\1</nobr>\\2', $s);

		// Hyphens
		$s = preg_replace('%(\W|^)((?:\w{1,2}(?:\-\w+))|(?:\w+(?:\-\w{1,2})))(?!\w)%u', '\\1<nobr>\\2</nobr>', $s);

		// Prepositions
		$s = preg_replace('%(\W|^)(at|or|and|the|a|by|an|in|on|of|for|to|as|i|or|my)\s%ui', '\\1\\2&nbsp;', $s);

		// Abbreviations
		$s = preg_replace('%([A-Z]{3,})%u', '<abbr>\\1</abbr>', $s);

		// Restore tags
		$s = preg_replace_callback("/<≈>/u", array($this, 'typo_restore_tags'), $s);

		// Last word in paragraph
		$s = preg_replace('%\s(\w+[.!?\)]</p>)%ui', '&nbsp;\\1', $s);

		// Unicode non-breaking space
		$s = str_replace('&nbsp;', ' ', $s);

		return trim($s);
	}
}
