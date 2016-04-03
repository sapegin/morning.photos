import PageWithTitle from './PageWithTitle';
import Photo from './components/Photo';

export default function($) {
	return (
		<PageWithTitle {...$} pageType="portfolio">
			<div class="photo-grid photo-grid_three-even">
				{$.albums.map(album => (
					<div class="photo-grid__photo">
						<a class="link link_quoted" href={album.url}>
							<Photo slug={album.cover} size="small" alt={album.title} class="photo-grid__img" />
							<h2 class="photo-grid__title">
								<u>{album.title}</u>
							</h2>
							{album.description &&
								<div class="photo-grid__description">
									<u>{album.description}</u>
								</div>
							}
						</a>
					</div>
				))}
			</div>
		</PageWithTitle>
	);
}
