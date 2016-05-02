import cx from 'classnames';
import { Group } from 'fledermaus/lib/components';
import { typo, typoTitle } from '../../src/util/typo';
import { getPhotoUrl } from '../../js/util/util';

export default ({
	url, title, caption, location, date, artist, exif, lang, slug,
	option, absolutizeUrl, __,
}) => (
	<div class="photo-info text">
		<header class="photo-info__header">
			<h1 class="photo-info__title js-gallery-info-title">
				{typoTitle(title || '***', lang)}
			</h1>
			<div class={cx('photo-info__caption', 'js-gallery-info-caption', { 'is-hidden': !caption })}>
				{typo(caption || '', lang)}
			</div>
		</header>
		<Group class="photo-info__meta">
			<span class={cx('js-gallery-info-location', { 'is-hidden': !location })}>{location || ''},</span>
			<span><time class="js-gallery-info-date">{date}</time>,</span>
			<span class="js-gallery-info-exif">{exif}</span>
		</Group>
		<div class={cx('photo-info__copyright', 'js-gallery-info-artist', { 'is-hidden': artist === option('artist') })}>
			© {artist}
		</div>
		<div
			class="photo-info__share social-likes social-likes_light js-gallery-info-share"
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
				data-image={absolutizeUrl(getPhotoUrl(slug, 'large'))}
			>
				{__('share.pinterest')}
			</div>
		</div>
	</div>
);
