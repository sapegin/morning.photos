import PageWithTitle from './PageWithTitle';
import PhotoGrid from './components/PhotoGrid';
import Photo from './components/Photo';

export default function($) {
	const { images, linkUrl, linkLabel } = $;
	const { typo } = $;
	return (
		<PageWithTitle {...$}>
			<a href={linkUrl} class="albums-link">
				<PhotoGrid>
					{images
						.slice(0, 3)
						.map(image => <Photo slug={image} size="small" class="album-thumbnail__img" />)}
				</PhotoGrid>
				<div class="albums-link__link">{typo(linkLabel)}</div>
			</a>
		</PageWithTitle>
	);
}
