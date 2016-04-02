import flow from 'lodash/flow';
import cx from 'classnames';

export default ({
	title, caption, location, date, artist, exif,
	typo, typoTitle, safe, option,
}) => (
	<div class="photo-info text">
		<header class="photo-info__header">
			<h1 class="photo-info__title js-gallery-info-title">
				{typoTitle(title || '***')}
			</h1>
			<div class={cx('photo-info__caption', 'js-gallery-info-caption', { 'is-hidden': !caption })}>
				{flow(typo, safe)(caption || '')}
			</div>
		</header>
		<div class="photo-info__meta">
			<span class={cx('js-gallery-info-location', { 'is-hidden': !location })}>{location || ''},</span>
			<time class="js-gallery-info-date">{date}</time>,
			<span class="js-gallery-info-exif">{exif}</span>
		</div>
		<footer class={cx('photo-info__copyright', 'js-gallery-info-artist', { 'is-hidden': artist === option('artist') })}>
			© {artist}
		</footer>
	</div>
);
