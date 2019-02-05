import React from 'react';
import { graphql } from 'gatsby';
import { css } from '@emotion/core';
import Gallery from 'react-photo-gallery';
import Helmet from 'react-helmet';
import { Link } from 'tamia-gatsby-link';
import PageWithTitle from './PageWithTitle';
import Metatags from '../components/Metatags';
import Photo from '../components/Photo';
import { getPhotoUrl } from '../util/photos';

const MARGIN = 4;

const ImageComponent = ({ photo }) => (
	<Link to={photo.slug}>
		<Photo
			css={css`
				margin: ${MARGIN}px;
			`}
			name={photo.src}
			modified={photo.modified}
			width={photo.width}
			height={photo.height}
			alt={photo.title}
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
			<Gallery
				photos={getPhotosForGallery(photos)}
				margin={MARGIN}
				ImageComponent={ImageComponent}
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
