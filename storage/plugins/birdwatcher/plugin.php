<?php

error_reporting(E_ALL);

class Birdwatcher extends KokenPlugin {
	function __construct()
	{
		$this->register_filter('site.output', 'awesomize');
	}

	function awesomize($html_str)
	{
		$html_str = $this->clean_koken($html_str);
		$html_str = $this->common_typo($html_str);

		require_once 'lib/ganon.php';
		$html = str_get_dom($html_str);
		$html = $this->process_page($html);
		$html = $this->process_essays($html);
		return (string)$html;
	}

	function clean_koken($html_str)
	{
		// Remove Koken shit from page header
		$html_str = preg_replace('%<!--\[if IE\]>.*?mediaelement-and-player.min.js[^"]*"></script>%sm', '', $html_str);
		$html_str = preg_replace('%<script src="/app/site/themes/common/js/pulse.js[^"]*"></script>%sm', '', $html_str);
		
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

	function process_page($html)
	{
		foreach ($html('.bw-page') as $page) {
			$page = $this->process_html($page, 'process_html_page');
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

	function process_html_page($html_str, $entry)
	{
		$html_str = $this->typo_process($html_str);
		return $html_str;
	}

	function process_html_essay($html_str, $entry)
	{
		$html_str = $this->process_lj($html_str, $entry);
		$html_str = $this->typo_process($html_str);
		return $html_str;
	}

	function process_html_essay_excerpt($html_str, $entry)
	{
		$html_str = $this->process_more($html_str, $entry);
		$html_str = $this->typo_process($html_str);
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
				if (strpos($base, 'IG-') !== false) {
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
				else { 
					// Library photo
					$this->process_img($img, 'entry-photo', 'large');

					$link = $embed('a[href*="/photos/"]', 0);
					if ($link) {
						$link->href = str_replace('/lightbox/', '/', $link->href);
						$link->class = 'entry-photo__link';
						$link->deleteAttribute('lightbox');
					}
				}
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
		$img->src = "$base$size.$extension";
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

	/*
	 * Обогащение типографики. Кавычки, тире и прочие знаки уже должны быть расставлены.
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