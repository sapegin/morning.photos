import cx from 'classnames';
import { Group } from 'fledermaus/lib/components';
import { typo, typoTitle } from '../../src/util/typo';

export default ({
	title, caption, location, date, artist, exif, lang,
	option,
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
		<footer class={cx('photo-info__copyright', 'js-gallery-info-artist', { 'is-hidden': artist === option('artist') })}>
			© {artist}
		</footer>
	</div>
);
