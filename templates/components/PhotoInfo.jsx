import block from 'bem-cn';
import { Group } from 'fledermaus/lib/components';
import { typo, typoTitle } from '../../src/util/typo';
import { getPhotoUrl } from '../../js/util/util';

const b = block('photo-info');

export default ({
	url, title, caption, location, date, artist, exif, lang, slug,
	option, absolutizeUrl, __,
}) => (
	<div class={b.mix('text')}>
		<header class={b('header')}>
			<h1 class={b('title').mix('js-gallery-info-title')}>
				{typoTitle(title || '***', lang)}
			</h1>
			<div class={b('caption').is({ hidden: !caption }).mix('js-gallery-info-caption')}>
				{typo(caption || '', lang)}
			</div>
		</header>
		<Group class={b('meta')}>
			<span class={b('location').is({ hidden: !location }).mix('js-gallery-info-location')}>
				{location || ''},
			</span>
			<span><time class="js-gallery-info-date">{date}</time>,</span>
			<span class="js-gallery-info-exif">{exif}</span>
		</Group>
		<div class={b('copyright').is({ hidden: artist === option('artist') }).mix('js-gallery-info-artist')}>
			© {artist}
		</div>
		<div
			class={b('share').mix(['social-likes', 'social-likes_light', 'js-gallery-info-share'])}
			data-title={`${title} — ${__('title')}`}
			data-url={absolutizeUrl(url)}
		>
			<div
				class="facebook"
				title="Share photo on Facebook"
			>
				{__('share.facebook')}
			</div>
			<div
				class="twitter"
				title="Share photo on Twitter"
				data-via={__('twitter')}
			>
				{__('share.twitter')}
			</div>
			<div
				class="pinterest"
				title="Share photo on Pinterest"
				data-media={absolutizeUrl(getPhotoUrl(slug, 'large'))}
			>
				{__('share.pinterest')}
			</div>
		</div>
	</div>
);
