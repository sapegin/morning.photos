// @flow
import React from 'react';
import Helmet from 'react-helmet';
import styled from '@emotion/styled';
import { Box, VisuallyHidden } from 'tamia';
import { Link, QuotedLink } from 'tamia-gatsby-link';
import Base from './Base';
import Metatags from '../components/Metatags';
import Icon from '../components/Icon';
import Logo from '../components/Logo';
import Footer from '../components/Footer';
import PhotoInfo from '../components/PhotoInfo';
import Inverted from '../components/Inverted';
import { getPhotoUrl } from '../util/photos';
import useKeyPress from '../util/useKeyPress';
import useMounted from '../util/useMounted';
import useSwipe from '../util/useSwipe';
import config from '../../config';

const { title: siteTitle } = config;

const easeInOutQuart = 'cubic-bezier(0.77, 0, 0.175, 1)';
const easeOutQuad = 'cubic-bezier(0.25, 0.46, 0.45, 0.94)';

// /albums/dogs/2010-09-24-0212 → /albums/dogs
const getAlbumSlug = slug => slug.replace(/\/[^/]+$/, '');

const LinkContainer = styled.div`
	position: absolute;
	transition: transform 0.5s 0.5s ${easeInOutQuart};
	left: ${p => p.position.endsWith('left') && 0};
	right: ${p => p.position.endsWith('right') && 0};

	/* Hide only when the device has hover and the browser supports focus-within */
	@media (hover: hover) {
		:not(*):focus-within,
		& {
			transform: ${p => p.position === 'left' && 'translateX(-110%)'};
			transform: ${p => p.position === 'right' && 'translateX(110%)'};
			transform: ${p => p.position.startsWith('top') && 'translateY(-110%)'};
		}
	}
`;

const TopLinkContainer = styled(LinkContainer)`
	padding: ${p => p.theme.space.s} ${p => p.theme.space.m};
	top: 0;
	z-index: 1;
`;

const NavLinkContainer = styled(LinkContainer)`
	display: none;

	@media (min-width: ${p => p.theme.breakpoints.small}) {
		display: flex;
		align-items: center;
		top: 0;
		bottom: 0;
	}
`;

const BackLinkLabel = styled(VisuallyHidden)`
	@media (min-width: ${p => p.theme.breakpoints.small}) {
		all: inherit;
	}
`;

const HeaderContainer = styled.header`
	position: absolute;
	overflow: hidden;
	top: 0;
	left: 0;
	right: 0;
	height: 100vh;
	z-index: 1;
	color: ${p => p.theme.colors.base};
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-shadow: 0 0 0.2ex rgba(0, 0, 0, 0.3);

	&:before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		height: 2.5em;
		background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0));
		transform: translateY(-2.5em);
		transition: transform 0.5s 0.5s ${easeInOutQuart};
	}

	.Photo__link {
		/* Disable transition on page load or when :focus-withing not supported */
		transform: ${p => p.hasLoaded || 'none'};
	}
	&:hover .Photo__link,
	&:focus-within .Photo__link,
	&:hover:before {
		transform: none;
		transition: transform 0.2s ${easeOutQuad};
	}
`;

const NavLink = ({ to, icon, children }) => (
	<Link to={to}>
		<VisuallyHidden>{children}</VisuallyHidden>
		<Icon icon={icon} m="m" />
	</Link>
);

const Header = ({ name, prev, next, albumSlug, albumTitle, ...props }) => (
	<HeaderContainer role="banner" {...props}>
		<TopLinkContainer position="top-left" className="Photo__link">
			<Logo />
		</TopLinkContainer>
		<nav>
			<TopLinkContainer position="top-right" className="Photo__link">
				<QuotedLink to={albumSlug} state={{ fromPhoto: name }}>
					<Box as="span" p="s" aria-hidden="true">
						←
					</Box>
					<BackLinkLabel as="u">Back to the {albumTitle.toLowerCase()} album</BackLinkLabel>
				</QuotedLink>
			</TopLinkContainer>
			{prev && (
				<NavLinkContainer position="left" className="Photo__link">
					<NavLink to={prev} icon="left">
						Previous photo
					</NavLink>
				</NavLinkContainer>
			)}
			{next && (
				<NavLinkContainer position="right" className="Photo__link">
					<NavLink to={next} icon="right">
						Next photo
					</NavLink>
				</NavLinkContainer>
			)}
		</nav>
	</HeaderContainer>
);

const Lightbox = styled.div`
	height: 100vh;
	margin: 0 -${p => p.theme.space.m};
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${p => p.theme.colors.base};
`;

const Spinner = styled(Icon)`
	position: absolute;
	color: ${p => p.theme.colors.bg};
`;

const Image = styled.img`
	max-width: 100vw;
	height: auto;
	max-height: 100vh;
	transform: translateX(${p => p.deltaX}px);
	transition: ${p => p.deltaX || `transform 0.2s ${p.easeInOutQuart}`};
`;

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
}) => {
	const albumSlug = getAlbumSlug(slug);
	const hasLoaded = useMounted();

	useKeyPress('ArrowLeft', () => {
		navigate(prev);
	});
	useKeyPress('ArrowRight', () => {
		navigate(next);
	});
	useKeyPress('Escape', () => {
		navigate(albumSlug);
	});

	const {
		delta,
		props: { onTouchStart },
	} = useSwipe({
		left: () => {
			if (next) {
				navigate(next);
			}
		},
		right: () => {
			if (prev) {
				navigate(prev);
			}
		},
	});
	return (
		<>
			<Inverted>
				<Header
					name={name}
					prev={prev}
					next={next}
					albumSlug={albumSlug}
					albumTitle={album}
					hasLoaded={hasLoaded}
					onTouchStart={onTouchStart}
				/>
			</Inverted>
			<main role="main">
				<Lightbox>
					<Spinner icon="camera" />
					<Image src={getPhotoUrl(name, modified, 'gallery')} alt={title} deltaX={delta} />
				</Lightbox>
				<Box mb="l" mt="m">
					<PhotoInfo title={photoTitle} {...props} />
				</Box>
			</main>
		</>
	);
};

export default ({
	pageContext: { title, prefetch, ...props },
	location: { pathname },
	navigate,
}) => {
	const photoTitle = title || 'Untitled';
	return (
		<Base>
			<Metatags
				slug={pathname}
				title={title}
				description={props.caption}
				image={props.name}
				imageModified={props.modified}
			/>
			<Helmet>
				<title>
					{photoTitle} — {siteTitle}
				</title>
				{prefetch.map(({ name, modified }) => (
					<link key={name} rel="prefetch" href={getPhotoUrl(name, modified, 'gallery')} />
				))}
			</Helmet>
			<Body title={title} photoTitle={photoTitle} navigate={navigate} {...props} />
			<Box py="s">
				<Footer />
			</Box>
		</Base>
	);
};
