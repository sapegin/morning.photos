import Photo from './Photo';

export default ($) => (
	<div>
		<div class="thumbnails js-thumbs">
			{$.photos.map(photo => (
				<a href={`${$.url}/${photo.slug}`} class="thumbnails__item">
					<Photo slug={photo.slug} size="thumb" alt={photo.title} class="js-img" />
				</a>
			))}
		</div>
		<script>{$.inlineFile('build/album.js')}</script>
	</div>
);
