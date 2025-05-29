import { Flex } from '../components/Flex';
import { FullWidth } from '../components/FullWidth';
import { Photograph } from '../components/Photograph';
import { Stack } from '../components/Stack';
import { type Photo } from '../types/Photo';
import { Page } from './Page';

type Props = {
	url: string;
	title: string;
	photos: Photo[][];
};

export function GalleryPage({ url, photos }: Props) {
	return (
		<Page url={url}>
			<FullWidth>
				<Stack gap={{ base: 'xl', desktop: 'xxl' }}>
					{photos.map((pair) =>
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
		</Page>
	);
}
