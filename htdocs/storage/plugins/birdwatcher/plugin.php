<?php

class Birdwatcher extends KokenPlugin {
	public $thumb_height = 200;

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
		$html_str = $this->common_typo($html_str);
		$html_str = $this->process_entries($html_str);
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
		$html_str = $this->process_lj($html_str);
		$html_str = $this->typo_process($html_str);
		return $html_str;
	}

	function process_html_essay_excerpt($html_str, $url)
	{
		$html_str = $this->process_more($html_str, $url);
		$html_str = $this->typo_process($html_str);
		$html_str = $this->process_lj($html_str);
		return $html_str;
	}

	// More tag
	function process_more($html_str, $url)
	{
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
	function process_lj($html_str)
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

		// Image height should be at least 200px
		$thumb_size = 'medium';
		$size = $this->get_image_size($img, $thumb_size);
		if ($size[1] < $this->thumb_height) {
			$thumb_size = 'large';
		}

		// Recalculate width to match 200px height
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
					$this->process_img($embed('img', 0), 'entry-instagrams', 'medium');

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

					$this->process_img($img, 'entry-photo', $img_size);

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

	function process_img($img, $block, $preset)
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
		// Убиваем табуляцию
		$s = str_replace("\t", '', $s);
		
		// Убиваем повторяющиеся пробелы
		$s = preg_replace('% +%', ' ', $s);

		// Исправляем неразрывные пробелы
		$s = str_replace(" ", '&nbsp;', $s);
	
		// Сохраняем теги
		$s = preg_replace_callback('%(<[^>]*>)%ums', array($this, 'typo_backup_tags'), $s);

		$search = array(
			'№ ',			// Номер
			'§ ',			// Параграф
			' —',			// Тире
			'и т. д.',
			'и т. п.',
		);
		$replace = array(
			'№&nbsp;',
			'§&nbsp;',
			'&nbsp;—',
			'и&nbsp;т.&nbsp;д.',
			'и&nbsp;т.&nbsp;п.',
		);
		$s = str_replace($search, $replace, $s);

		// Год
		$s = preg_replace('%(?<![0-9])([0-9]{4}) (г\.)%ui', '\\1&nbsp;\\2', $s);
		
		// Имена собственные
		// $s = preg_replace('%(?<![а-яёА-ЯЁ])([гГ]|[гГ]р|[тТ]ов)\. ([А-ЯЁ])%u', '\\1.&nbsp;\\2', $s);
		
		// Инициалы
		$s = preg_replace('%(?<![а-яёА-ЯЁ])((?:[А-ЯЁ]\. ){1,2}[А-ЯЁ][-а-яё]+)%u', '<nobr>\\1</nobr>', $s);
		
		// Слова через дефис
		$s = preg_replace('%(?<![а-яё])((?:[а-яё]{1,2}(?:\-[а-яё]+))|(?:[а-яё]+(?:\-[а-яё]{1,2})))(?![а-яё])%ui', '<nobr>\\1</nobr>', $s);
		
		// Частицы
		$s = preg_replace('% (ж|бы|б|же|ли|ль|либо|или)(?![а-яё])%ui', '&nbsp;\\1', $s);
		
		// Предлоги и союзы
		$s = preg_replace('%(?<![а-яё])(а|в|во|вне|и|или|к|о|с|у|о|со|об|обо|от|ото|то|на|не|ни|но|из|изо|за|уж|на|по|под|подо|пред|предо|про|над|надо|как|без|безо|что|да|для|до|там|ещё|их|или|ко|меж|между|перед|передо|около|через|сквозь|для|при|я)\s%ui', '\\1&nbsp;', $s);

		// Валюты
		$s = preg_replace('%(\d) (\$|р\.|руб\.)%ui', '\\1&nbsp;\\2', $s);
		
		// Даты
		$s = preg_replace('%(\d) (января|февраля|марта|апреля|мая|июня|июля|августа|сентября|ноября|декабря)%ui', '\\1&nbsp;\\2', $s);

		// Восстанавливаем теги
		$s = preg_replace_callback("/<≈>/u", array($this, 'typo_restore_tags'), $s);

		// Последнее слово в абзаце
		$s = preg_replace('%\s([а-яё]+[.!?\)]</p>)%ui', '&nbsp;\\1', $s);

		$s = str_replace('&nbsp;', " ", $s);

		return trim($s);
	}
}