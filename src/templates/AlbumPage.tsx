import _ from 'lodash';
import { Flex } from '../components/Flex';
import { FullWidth } from '../components/FullWidth';
import { Photograph } from '../components/Photograph';
import { Stack } from '../components/Stack';
import { type Photo } from '../types/Photo';
import { PageWithTitle } from './PageWithTitle';

type Props = {
	url: string;
	title: string;
	photos: Photo[];
};

export function AlbumPage({ url, title, photos }: Props) {
	// Group by aspect ratio, but keep all horizontal photos in a single group
	const photosByAspectRatio = _.groupBy(photos, (x) => {
		const aspectRatio = x.width / x.height;
		return aspectRatio < 1 ? aspectRatio : 0;
	});

	// Split each group of vertical photos into pairs
	const photoPairs = Object.entries(photosByAspectRatio).flatMap(
		([aspectRatio, images]) => {
			return _.chunk(images, aspectRatio === '0' ? 1 : 2);
		}
	);

	// Sort by the date of the first photo in the pair
	const sortedPhotos = _.orderBy(photoPairs, [(x) => x[0].timestamp], ['desc']);

	return (
		<PageWithTitle url={url} title={title}>
			<FullWidth>
				<Stack gap={{ base: 'xl', desktop: 'xxl' }}>
					{sortedPhotos.map((pair) =>
						pair.length === 1 ? (
							<Flex
								key={pair[0].name}
								id={pair[0].name}
								justifyContent="center"
							>
								<Photograph photo={pair[0]} />
							</Flex>
						) : (
							<Stack
								key={pair[0].name}
								direction={{ base: 'column', tablet: 'row' }}
								gap={{ base: 'xl', tablet: 'm' }}
								justifyContent="center"
							>
								{pair.map((photo) => (
									<Flex
										key={photo.name}
										id={photo.name}
										justifyContent="center"
									>
										<Photograph photo={photo} />
									</Flex>
								))}
							</Stack>
						)
					)}
				</Stack>
			</FullWidth>
		</PageWithTitle>
	);
}
