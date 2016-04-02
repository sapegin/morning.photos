import PageWithTitle from './PageWithTitle';
import Photo from './components/Photo';

export default function($) {
	return (
		<PageWithTitle {...$} pageType="portfolio">
			<div class="albums">
				{$.albums.map(album => (
					<div class="albums__item album-thumbnail">
						<a class="album-thumbnail__link link link_quoted" href={album.url}>
							<Photo slug={album.cover} size="small" alt={album.title} class="album-thumbnail__img" />
							<h2 class="album-thumbnail__title">
								<u>{album.title}</u>
							</h2>
						</a>
					</div>
				))}
			</div>
		</PageWithTitle>
	);
}
