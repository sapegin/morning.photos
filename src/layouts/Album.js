import React, { useRef, useEffect } from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Gallery from 'react-photo-gallery';
import { Link } from 'tamia-gatsby-link';
import PageWithTitle from './PageWithTitle';
import Metatags from '../components/Metatags';
import { getPhotoUrl } from '../util/photos';

const MARGIN = 4;

const Image = styled('img', {
	shouldForwardProp: prop => ['src', 'width', 'height', 'alt'].includes(prop),
})`
	display: block;
	margin: ${MARGIN}px;
	background-color: ${props => props.color};
`;

const Card = ({ photo }) => {
	const linkRef = useRef();
	useEffect(() => {
		if (photo.focus) {
			linkRef.current.focus();
		}
	}, []);
	return (
		<Link to={photo.slug} ref={ref => (linkRef.current = ref)}>
			<Image
				src={getPhotoUrl(photo.src, photo.modified, photo.width)}
				width={photo.width}
				height={photo.height}
				alt={photo.title || 'Untitled'}
				color={photo.color}
			/>
		</Link>
	);
};

const getPhotosForGallery = (photos, focus) =>
	photos.map(({ name, ...rest }) => ({
		src: name,
		focus: name === focus,
		...rest,
	}));

export default ({
	data: {
		mdx: {
			frontmatter: { title, pageTitle },
		},
	},
	pageContext: { photos },
	location: { pathname, state },
}) => {
	return (
		<PageWithTitle url={pathname} title={title} pageTitle={pageTitle} fullWidth>
			<Metatags
				slug={pathname}
				title={pageTitle}
				image={photos[0].name}
				imageModified={photos[0].modified}
			>
				{photos.slice(0, 3).map(({ name, modified }) => (
					<link key={name} rel="prefetch" href={getPhotoUrl(name, modified, 'gallery')} />
				))}
			</Metatags>
			<Gallery
				photos={getPhotosForGallery(photos, state && state.fromPhoto)}
				margin={MARGIN}
				ImageComponent={Card}
			/>
		</PageWithTitle>
	);
};

export const pageQuery = graphql`
	query AlbumPage($slug: String!) {
		mdx(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				pageTitle
			}
		}
	}
`;
