// @flow

const PHOTO_PROTOCOL = 'photo://';

const URL_PREFIX = 'https://res.cloudinary.com/morningphotos/image/upload';

const SIZES = {
	blog: 'c_scale,dpr_auto,f_auto,q_auto:best,e_sharpen:70,w_1024',
	gallery: 'c_scale,dpr_auto,f_auto,q_auto:best,e_sharpen:70,w_1600',
	thumbnail: 'c_scale,dpr_auto,f_auto,q_auto:good,w_600',
};

const getAutoTranformation = width => {
	const roundedWidth = 100 * Math.ceil(width / 100);
	const quality = roundedWidth >= 500 ? 'best' : 'good';
	return `c_scale,dpr_auto,f_auto,q_auto:${quality},w_${roundedWidth}`;
};

export type Size = $Keys<typeof SIZES>;

export const getPhotoUrl = (
	name: string,
	timestamp: number,
	size: $Keys<typeof SIZES> | number
) => {
	const tranformation = SIZES[size] || getAutoTranformation(size);
	return `${URL_PREFIX}/${tranformation}/v${Math.floor(timestamp)}/photos/${name}.jpg`;
};

export const isPhotoUrl = url => url && url.startsWith(PHOTO_PROTOCOL);

export const getPhotoNameFromUrl = url => url.substring(PHOTO_PROTOCOL.length);
