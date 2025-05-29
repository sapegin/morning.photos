import { Box } from '../components/Box';
import { Expander } from '../components/Expander';
import { Grid } from '../components/Grid';
import { Heading } from '../components/Heading';
import { Image } from '../components/Image';
import { Link } from '../components/Link';
import { LinkWithIcon } from '../components/LinkWithIcon';
import { PostList } from '../components/PostList';
import { Stack } from '../components/Stack';
import { Text } from '../components/Text';
import { ME_BLUESKY_URL, ME_GITHUB_URL, ME_MASTODON_URL } from '../constants';
import type { Post } from '../types/Post';
import { Page } from './Page';

type Props = {
	url: string;
	blogPosts: Post[];
};

function Intro() {
	return (
		<Stack as="section" gap="m">
			<Stack gap="m">
				<Text variant="intro">
					<LinkWithIcon icon="mail" href="mailto:artem@sapegin.ru">
						Write to me
					</LinkWithIcon>
					,{' '}
					<LinkWithIcon icon="comment" href={`${ME_GITHUB_URL}/ama`}>
						ask me anything
					</LinkWithIcon>
					,
					<br />
					follow me on{' '}
					<LinkWithIcon icon="mastodon" href={ME_MASTODON_URL} rel="me">
						Mastodon
					</LinkWithIcon>
					,{' '}
					<LinkWithIcon icon="bluesky" href={ME_BLUESKY_URL}>
						Bluesky
					</LinkWithIcon>
					,{' '}
					<LinkWithIcon icon="github" href={ME_GITHUB_URL}>
						GitHub
					</LinkWithIcon>
					, or{' '}
					<LinkWithIcon icon="devto" href="https://dev.to/sapegin">
						Dev.to
					</LinkWithIcon>
					,<br />
					or keep reading about me:
				</Text>
			</Stack>
		</Stack>
	);
}

function Writing({ blogPosts }: Pick<Props, 'blogPosts'>) {
	return (
		<Stack as="section" gap="m">
			<Heading level={2}>I write about frontend development</Heading>
			<Stack gap="l">
				<Stack gap="m">
					<Heading level={3}>Recent blog posts</Heading>
					<PostList posts={blogPosts} showDates />
				</Stack>
			</Stack>
		</Stack>
	);
}

function Photography() {
	return (
		<Stack as="section" gap="m">
			<Heading level={2}>I make photos of trees, buildings, and things</Heading>
			<Expander>
				<Image
					src="/images/photos-1.avif"
					alt="Saxon Switzerland forest, Germany"
					width={900}
					height={505}
				/>
			</Expander>
			<Expander>
				<Grid gap="m" auto="narrow">
					<Image
						src="/images/photos-2.avif"
						alt="Dawn in Berlin, Germany"
						width={600}
						height={840}
					/>
					<Box display={{ base: 'none', tablet: 'block' }}>
						<Image
							src="/images/photos-3.avif"
							alt="Foggy Berliner Dom, Germany"
							width={600}
							height={840}
						/>
					</Box>
					<Image
						src="/images/photos-4.avif"
						alt="Sunrise in Rome, Italy"
						width={600}
						height={840}
					/>
				</Grid>
			</Expander>
			<Text>
				See{' '}
				<Link href="/photos/">more of my photos and my photography zine</Link>.
			</Text>
		</Stack>
	);
}

function Me() {
	return (
		<Stack as="section" gap="m">
			<Heading level={2}>I may (or may not) look like this</Heading>
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
		</Stack>
	);
}

function BestViewed() {
	return (
		<Stack as="section" gap="s" textAlign="center">
			<Text>This page is best viewed in:</Text>
			<Box
				as="img"
				src="/images/netscape.gif"
				alt="Netscape Navigator"
				title="Netscape Navigator"
				mx="auto"
				width={60}
				height={60}
				loading="lazy"
			/>
		</Stack>
	);
}

export function MainPage({ url, blogPosts }: Props) {
	return (
		<Page url={url}>
			<Intro />
			<Writing blogPosts={blogPosts} />
			<Photography />
			<Me />
			<BestViewed />
		</Page>
	);
}
