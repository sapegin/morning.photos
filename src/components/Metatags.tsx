import React from 'react';
import { Helmet } from 'react-helmet';
import { getPhotoUrl } from '../util/photos';
// @ts-ignore
import config from '../../config';

const { title: siteTitle, siteUrl, description: defaultDescription, twitter, fbappid } = config;

type Props = {
	slug: string;
	title: string;
	description?: string;
	image?: string;
	imageModified?: number;
	noIndex?: boolean;
	children?: React.ReactNode;
};

export default function Metadata({
	slug,
	title,
	description = defaultDescription,
	image,
	imageModified,
	noIndex = false,
	children,
}: Props) {
	const imageUrl =
		image &&
		(image.startsWith('/') ? `${siteUrl}${image}` : getPhotoUrl(image, imageModified, 'medium'));
	return (
		<Helmet>
			{noIndex && <meta name="robots" content="noindex follow" />}
			<meta name="description" content={description} />
			{imageUrl && <meta property="og:image" content={imageUrl} />}
			<meta property="og:type" content="website" />
			<meta property="og:title" content={title} />
			<meta property="og:url" content={`${siteUrl}${slug}`} />
			<meta property="og:site_name" content={siteTitle} />
			<meta property="og:description" content={description} />
			<meta property="fb:app_id" content={fbappid} />
			{imageUrl && <meta name="twitter:card" content="summary_large_image" />}
			{imageUrl && <meta name="twitter:image" content={imageUrl} />}
			<meta name="twitter:site" content={twitter} />
			{children}
		</Helmet>
	);
}
