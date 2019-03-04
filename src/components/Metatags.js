import React from 'react';
import Helmet from 'react-helmet';
import { getPhotoUrl } from '../util/photos';
import config from '../../config';

const {
	title: siteTitle,
	titleBlog,
	siteUrl,
	description: defaultDescription,
	twitter,
	fbappid,
} = config;

export default ({
	slug,
	title,
	description = defaultDescription,
	image,
	imageModified,
	noIndex,
	children,
}) => {
	const isBlog = slug.startsWith('/blog');
	const isBlogPost = slug.startsWith('/blog/');
	const imageUrl =
		image &&
		(image.startsWith('/') ? `${siteUrl}${image}` : getPhotoUrl(image, imageModified, 'blog'));
	return (
		<Helmet>
			{noIndex && <meta name="robots" content="noindex follow" />}
			<meta name="description" content={description} />
			{imageUrl && <meta property="og:image" content={imageUrl} />}
			<meta property="og:type" content={isBlogPost ? 'article' : 'website'} />
			<meta property="og:title" content={title} />
			<meta property="og:url" content={`${siteUrl}${slug}`} />
			<meta property="og:site_name" content={isBlog ? titleBlog : siteTitle} />
			<meta property="og:description" content={description} />
			<meta property="fb:app_id" content={fbappid} />
			{imageUrl && <meta name="twitter:card" content="summary_large_image" />}
			{imageUrl && <meta name="twitter:image" content={imageUrl} />}
			<meta name="twitter:site" content={twitter} />
			{children}
		</Helmet>
	);
};
