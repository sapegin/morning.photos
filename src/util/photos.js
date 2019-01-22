// @flow

const PHOTO_PROTOCOL = 'photo://';

const URL_PREFIX = 'https://res.cloudinary.com/morningphotos/image/upload';

const SIZES = {
	blog: 'c_scale,q_auto:best,e_sharpen:70,w_1024',
	gallery: 'c_scale,q_auto:best,e_sharpen:70,w_1600',
	thumbnail: 'c_scale,q_auto:best,w_600',
};

export type Size = $Keys<typeof SIZES>;

export const getPhotoUrl = (name: string, timestamp: number, size: $Keys<typeof SIZES>) =>
	`${URL_PREFIX}/${SIZES[size]}/v${Math.floor(timestamp)}/photos/${name}.jpg`;

export const isPhotoUrl = url => url && url.startsWith(PHOTO_PROTOCOL);

export const getPhotoNameFromUrl = url => url.substring(PHOTO_PROTOCOL.length);
