import flow from 'lodash/flow';
import PageWithTitle from './PageWithTitle';
import PhotoGrid from './components/PhotoGrid';

export default function($) {
	const { content } = $;
	const { typo, safe } = $;
	return (
		<PageWithTitle {...$}>
			<PhotoGrid>
				<a href="/albums/curonian-spit/photos/237/">
					<img src="/images/buy/buy1.jpg" width="328" height="219" alt="Baltic Sea in twilight" />
				</a>
				<a href="/albums/tallinn/photos/68/">
					<img src="/images/buy/buy2.jpg" width="328" height="219" alt="Morning Tallinn" />
				</a>
				<a href="/albums/zubova-schel/photos/307/">
					<img src="/images/buy/buy3.jpg" width="328" height="219" alt="Boulders on a sea shore after sunset" />
				</a>
			</PhotoGrid>

			<div class="text">{flow(typo, safe)(content)}</div>
		</PageWithTitle>
	);
}
