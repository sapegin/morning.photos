import React from 'react';
import { getPhotoUrl } from '../util/photos';
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL, SITE_TWITTER, SITE_FB_APP_ID } from '../shared';
import theme from '../theme';

type Props = {
	slug: string;
	title?: string;
	pageTitle?: string;
	description?: string;
	image?: string;
	imageModified?: number;
	noIndex?: boolean;
	children?: React.ReactNode;
};

export default function Metatags({
	slug,
	title,
	pageTitle,
	description = SITE_DESCRIPTION,
	image,
	imageModified,
	noIndex = false,
	children,
}: Props) {
	const imageUrl =
		image &&
		(image.startsWith('/') ? `${SITE_URL}${image}` : getPhotoUrl(image, imageModified, 'medium'));
	return (
		<>
			<title>{pageTitle || `${title} — ${SITE_TITLE}`}</title>
			<meta name="theme-color" content={theme.colors.primary} />
			<meta name="twitter:creator" content="iamsapegin" />
			<meta name="apple-mobile-web-app-capable" content="yes" />
			<link rel="preconnect" href="https://res.cloudinary.com" />
			{noIndex && <meta name="robots" content="noindex follow" />}
			<meta name="description" content={description} />
			{imageUrl && <meta property="og:image" content={imageUrl} />}
			<meta property="og:type" content="website" />
			<meta property="og:title" content={pageTitle || title} />
			<meta property="og:url" content={`${SITE_URL}${slug}`} />
			<meta property="og:site_name" content={SITE_TITLE} />
			<meta property="og:description" content={description} />
			<meta property="fb:app_id" content={SITE_FB_APP_ID} />
			{imageUrl && <meta name="twitter:card" content="summary_large_image" />}
			{imageUrl && <meta name="twitter:image" content={imageUrl} />}
			<meta name="twitter:site" content={SITE_TWITTER} />
			{children}
		</>
	);
}
