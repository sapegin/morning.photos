import React from 'react';
import { css } from '@emotion/core';
import Gallery from 'react-photo-gallery';
import { Link } from 'tamia-gatsby-link';
import PageWithTitle from './PageWithTitle';
import Photo from '../components/Photo';
import config from '../../config';

const { title: siteTitle } = config;

const MARGIN = 4;

const ImageComponent = ({ photo }) => (
	<Link to={photo.slug}>
		<Photo
			css={css`
				margin: ${MARGIN}px;
			`}
			name={photo.src}
			size="thumbnail"
			width={photo.width}
			height={photo.height}
			alt={photo.title}
			color={photo.color}
		/>
	</Link>
);

const getPhotosForGallery = photos =>
	photos.map(({ name, width, height, slug, title, color }) => ({
		src: name,
		width,
		height,
		slug,
		title,
		color,
	}));

export default ({ pageContext: { title, photos }, location: { pathname } }) => {
	return (
		<PageWithTitle url={pathname} title={title} pageTitle={`${title} — ${siteTitle}`} fullWidth>
			<Gallery
				photos={getPhotosForGallery(photos)}
				margin={MARGIN}
				ImageComponent={ImageComponent}
			/>
		</PageWithTitle>
	);
};
