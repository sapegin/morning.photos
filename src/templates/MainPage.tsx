import { VisuallyHidden } from '../components/VisuallyHidden';
import { Box } from '../components/Box';
import { BuyMeCoffee } from '../components/BuyMeCoffee';
import { Expander } from '../components/Expander';
import { Frame } from '../components/Frame';
import { Grid } from '../components/Grid';
import { Image } from '../components/Image';
import { Link } from '../components/Link';
import { Markdown } from '../components/Markdown';
import { Stack } from '../components/Stack';
import { Subscription } from '../components/Subscription';
import { TextContent } from '../components/TextContent';
import { Thumbnail } from '../components/Thumbnail';
import type { Photo } from '../types/Photo';
import type { Resource } from '../types/Resource';
import { Page } from './Page';

type Props = {
	url: string;
	title: string;
	text: string;
	photos: Photo[];
	links: Resource[][];
};

function findPhoto(photos: Photo[], name: string) {
	return photos.find((x) => x.name === name);
}

function Links({ links }: Pick<Props, 'links'>) {
	return (
		<ul>
			{links.map((group) =>
				group.map(({ url, title }, index) => (
					<Box
						key={url}
						as="li"
						mb={index === group.length - 1 ? 'm' : undefined}
					>
						<Link href={url}>{title}</Link>
					</Box>
				))
			)}
		</ul>
	);
}

function Photos({ photos }: Pick<Props, 'photos'>) {
	const photo1 = findPhoto(photos, '2021-11-06_8253_Artem_Sapegin');
	const photo2 = findPhoto(photos, '2021-03-08_1475_Artem_Sapegin');
	const photo3 = findPhoto(photos, '2021-02-07_8254_Artem_Sapegin');
	const photo4 = findPhoto(photos, '2021-07-30_4525_Artem_Sapegin');
	return (
		<Stack as="section" gap="m">
			{photo1 && (
				<Expander>
					<Thumbnail
						photo={photo1}
						size="medium"
						alt="Saxon Switzerland forest, Germany"
					/>
				</Expander>
			)}
			<Expander>
				<Grid gap="m" auto="narrow">
					{photo2 && (
						<Frame aspectRatio="65/90">
							<Thumbnail
								photo={photo2}
								size="medium"
								alt="Dawn in Berlin, Germany"
							/>
						</Frame>
					)}
					<Box display={{ base: 'none', tablet: 'block' }}>
						{photo3 && (
							<Frame aspectRatio="65/90">
								<Thumbnail
									photo={photo3}
									size="medium"
									alt="Snowstorm in Berlin, Germany"
								/>
							</Frame>
						)}
					</Box>
					{photo4 && (
						<Frame aspectRatio="65/90">
							<Thumbnail
								photo={photo4}
								size="medium"
								alt="Sunrise in Rome, Italy"
							/>
						</Frame>
					)}
				</Grid>
			</Expander>
		</Stack>
	);
}

function Photos2({ photos }: Pick<Props, 'photos'>) {
	const photo1 = findPhoto(photos, 'IMG_7743');
	const photo2 = findPhoto(photos, 'IMG_5445');
	const photo3 = findPhoto(photos, 'IMG_8108');
	const photo4 = findPhoto(photos, '2023-12-30_1325_Artem_Sapegin');
	return (
		<Stack as="section" gap="m">
			<Expander>
				<Grid gap="m" auto="narrow">
					{photo1 && (
						<Frame aspectRatio="65/90">
							<Thumbnail
								photo={photo1}
								size="medium"
								alt="View from the top floor of Pressehaus, Berlin, Germany"
							/>
						</Frame>
					)}
					<Box display={{ base: 'none', tablet: 'block' }}>
						{photo2 && (
							<Frame aspectRatio="65/90">
								<Thumbnail
									photo={photo2}
									size="medium"
									alt="Peeled advertisement posters, Berlin, Germany"
								/>
							</Frame>
						)}
					</Box>
					{photo3 && (
						<Frame aspectRatio="65/90">
							<Thumbnail
								photo={photo3}
								size="medium"
								alt="Birds chasing an airplane, Berlin, Germany"
							/>
						</Frame>
					)}
				</Grid>
			</Expander>
			{photo4 && (
				<Expander>
					<Thumbnail
						photo={photo4}
						size="medium"
						alt="Saxon Switzerland forest, Germany"
					/>
				</Expander>
			)}
		</Stack>
	);
}

function Me() {
	return (
		<Expander>
			<Grid gap="m" auto="narrow">
				<Image
					src="/images/me-1.avif"
					alt="Artem Sapegin is making a photo"
					width={700}
					height={700}
				/>
				<Box display={{ base: 'none', tablet: 'block' }}>
					<Image
						src="/images/me-2.avif"
						alt="Artem Sapegin is drinking coffee"
						width={700}
						height={700}
					/>
				</Box>
				<Image
					src="/images/me-3.avif"
					alt="Artem Sapegin is making a photo"
					width={700}
					height={700}
				/>
			</Grid>
		</Expander>
	);
}

export function MainPage({ url, title, text, photos, links }: Props) {
	return (
		<Page url={url}>
			<Stack gap="xl">
				<VisuallyHidden as="h1">{title}</VisuallyHidden>
				<Photos photos={photos} />
				<Stack gap="l">
					<Grid
						gridColumnGap="l"
						gridTemplateColumns={{ base: '1fr', desktop: '2fr 1fr' }}
					>
						<TextContent>
							<Markdown text={text} />
						</TextContent>
						<Links links={links} />
					</Grid>
					<Photos2 photos={photos} />
					<Me />
					<BuyMeCoffee />
				</Stack>
				<Subscription />
			</Stack>
		</Page>
	);
}
