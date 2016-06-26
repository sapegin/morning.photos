import Base from './Base';
import Photo from './components/Photo';
import PhotoInfo from './components/PhotoInfo';

export default function($) {
	const { slug, title, keywords, albumUrl, albumTitle, photos } = $;
	const { json, option, Script, Icon } = $;
	return (
		<Base {...$} pageType="content" viewportExtra="minimal-ui">
			<script>
				document.documentElement.classList.add({json('is-fullscreen')});
				// mixpanel.track({json('Photo viewed')}, {json({ Title: title, Id: slug })});
			</script>

			<div class="is-pocketed">
				<Photo slug={slug} size="large" alt={title + (keywords.length && `: ${keywords.join(', ')}`)} />
			</div>

			<u-gallery class="lightbox" data-album-url={albumUrl}>
				<div class="lightbox__logo logo"><a href="/" class="logo__link">{option('title')}</a></div>

				<div class="lightbox__gallery">
					<div class="lightbox__gallery-holder js-gallery-container swiper-container">
						<div class="swiper-wrapper js-gallery-wrapper"></div>
					</div>
				</div>

				<div class="lightbox__arrow lightbox__arrow_left lightbox-button js-gallery-prev">
					<Icon name="left" />
				</div>
				<div class="lightbox__arrow lightbox__arrow_right lightbox-button js-gallery-next">
					<Icon name="right" />
				</div>
				<a href={albumUrl} class="lightbox__close lightbox-button">
					<Icon name="close" />
					<div class="lightbox__close-tooltip">
						Back to “{albumTitle}” album
					</div>
				</a>

				<div class="lightbox__controls">
					<div class="lightbox-pane">
						<div class="lightbox-pane__button lightbox-button">
							<Icon name="info" />
						</div>
						<div class="lightbox-pane__popup">
							<PhotoInfo {...$} />
						</div>
					</div>
				</div>
			</u-gallery>


			<script>
				var __galleryInitialSlug = {json(slug)};
				var __galleryPhotos = {json(photos)};
			</script>
			<Script src="/build/main.js"/>
			<Script src="/build/gallery.js"/>
		</Base>
	);
}
