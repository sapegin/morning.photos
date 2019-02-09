import React from 'react';
import { graphql } from 'gatsby';
import styled from '@emotion/styled';
import Gallery from 'react-photo-gallery';
import Helmet from 'react-helmet';
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

const Card = ({ photo }) => (
	<Link to={photo.slug}>
		<Image
			src={getPhotoUrl(photo.src, photo.modified, photo.width)}
			width={photo.width}
			height={photo.height}
			alt={photo.title || 'Untitled'}
			color={photo.color}
		/>
	</Link>
);

const getPhotosForGallery = photos =>
	photos.map(({ name, width, height, slug, modified, title, color }) => ({
		src: name,
		modified,
		width,
		height,
		slug,
		title,
		color,
	}));

export default ({
	data: {
		mdx: {
			frontmatter: { title, pageTitle },
		},
	},
	pageContext: { photos },
	location: { pathname },
}) => {
	return (
		<PageWithTitle url={pathname} title={title} pageTitle={pageTitle} fullWidth>
			<Metatags
				slug={pathname}
				title={pageTitle}
				image={photos[0].name}
				imageModified={photos[0].modified}
			/>
			<Helmet>
				{photos.slice(0, 3).map(({ name, modified }) => (
					<link key={name} rel="prefetch" href={getPhotoUrl(name, modified, 'gallery')} />
				))}
			</Helmet>
			<Gallery photos={getPhotosForGallery(photos)} margin={MARGIN} ImageComponent={Card} />
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
