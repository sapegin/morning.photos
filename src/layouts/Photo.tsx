import React, { ComponentProps } from 'react';
import { Box, Flex, Stack, Text, VisuallyHidden } from 'tamia';
import { QuotedLink } from 'tamia-gatsby-link';
import Base from './Base';
import Metatags from '../components/Metatags';
import Icon from '../components/Icon';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import PhotoInfo from '../components/PhotoInfo';
import { getPhotoUrl } from '../util/photos';
import useKeyPress from '../util/useKeyPress';
import { Photo } from '../types';

// /albums/dogs/2010-09-24-0212 → /albums/dogs
const getAlbumSlug = (slug: string) => slug.replace(/\/[^/]+$/, '');

const DesktopOnly = (props: ComponentProps<typeof Box>) => (
	<Box display={['none', null, 'block']} {...props} />
);

type BackLinkProps = {
	name: string;
	albumSlug: string;
	albumTitle: string;
};
const BackLink = ({ name, albumSlug, albumTitle }: BackLinkProps) => (
	// @ts-ignore
	<QuotedLink href={albumSlug} state={{ fromPhoto: name }}>
		<Flex alignItems="center">
			<Text as="span" pr="xs" aria-hidden="true">
				⤺
			</Text>
			<Text as="u" display={['inline', null, 'none']}>
				Back <VisuallyHidden>to the {albumTitle.toLowerCase()} album</VisuallyHidden>
			</Text>
			<Text as="u" display={['none', null, 'inline']}>
				Back to the {albumTitle.toLowerCase()} album
			</Text>
		</Flex>
	</QuotedLink>
);

const PrevLink = (props: ComponentProps<typeof QuotedLink>) => (
	<QuotedLink {...props}>
		<Box as="span" pr="xs" aria-hidden="true">
			←
		</Box>
		<u>Previous photo</u>
	</QuotedLink>
);

const NextLink = (props: ComponentProps<typeof QuotedLink>) => (
	<QuotedLink {...props}>
		<u>Next photo</u>
		<Box as="span" pl="xs" aria-hidden="true">
			→
		</Box>
	</QuotedLink>
);

type HeaderProps = BackLinkProps & {
	prev: string;
	next: string;
};

const Header = ({ prev, next, ...props }: HeaderProps) => (
	<Flex role="banner" py="s" px="m" justifyContent="space-between">
		<Logo />
		<Stack as="nav" gap="m" direction="row">
			{prev && (
				<DesktopOnly>
					<PrevLink href={prev} />
				</DesktopOnly>
			)}
			{next && (
				<DesktopOnly>
					<NextLink href={next} />
				</DesktopOnly>
			)}
			<BackLink {...props} />
		</Stack>
	</Flex>
);

type BodyProps = Photo & {
	photoTitle: string;
	prev: string;
	next: string;
	album: string;
	navigate: (path: string) => void;
};

const Body = ({
	slug,
	name,
	modified,
	title,
	photoTitle,
	prev,
	next,
	album,
	navigate,
	...props
}: BodyProps) => {
	const albumSlug = getAlbumSlug(slug);

	useKeyPress('ArrowLeft', () => {
		navigate(prev);
	});
	useKeyPress('ArrowRight', () => {
		navigate(next);
	});
	useKeyPress('Escape', () => {
		navigate(albumSlug);
	});

	return (
		<>
			<Header name={name} prev={prev} next={next} albumSlug={albumSlug} albumTitle={album} />
			<main role="main">
				<Flex height="100vh" overflow="hidden" alignItems="center" justifyContent="center">
					<Box as={Icon} icon="camera" position="absolute" zIndex={-1} />
					<Box
						as="img"
						height="auto"
						maxWidth="calc(100vw - 1rem)"
						maxHeight="calc(100vh - 4.75rem)"
						src={getPhotoUrl(name, modified, 'gallery')}
						alt={title}
					/>
				</Flex>
				<Box px="m" mb="l">
					<PhotoInfo title={photoTitle} {...props} />
				</Box>
			</main>
		</>
	);
};

type Props = {
	pageContext: Photo & {
		prev: string;
		next: string;
		album: string;
		prefetch: {
			name: string;
			modified: number;
		}[];
	};
	location: {
		pathname: string;
	};
	navigate: (path: string) => void;
};

export default function PhotoPage({ pageContext: { title, prefetch, ...props }, navigate }: Props) {
	const photoTitle = title || 'Untitled';
	return (
		<Base>
			<Body title={title} photoTitle={photoTitle} navigate={navigate} {...props} />
			<Box py="s" px="m">
				<Footer />
			</Box>
		</Base>
	);
}

export const Head = ({
	pageContext: { title, caption, name, modified, prefetch },
	location: { pathname },
}: Props) => {
	const photoTitle = title || 'Untitled';
	return (
		<Metatags
			slug={pathname}
			title={photoTitle}
			description={caption}
			image={name}
			imageModified={modified}
		>
			{prefetch.map(({ name, modified }) => (
				<link key={name} rel="prefetch" href={getPhotoUrl(name, modified, 'gallery')} />
			))}
		</Metatags>
	);
};
