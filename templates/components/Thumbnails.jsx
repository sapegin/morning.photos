import Photo from './Photo';

export default ({ photos, url, Script }) => (
	<div class="thumbnails js-thumbs">
		{photos.map(photo => (
			<a href={`${url}/${photo.slug}`} class="thumbnails__item">
				<Photo slug={photo.slug} size="thumb" alt={photo.title} class="js-img" />
			</a>
		))}
		<Script src="build/album.js" inline />
	</div>
);
