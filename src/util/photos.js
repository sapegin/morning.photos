// @flow
const SIZES = {
	blog: 'c_scale,q_auto:best,e_sharpen:70,w_1024',
	gallery: 'c_scale,q_auto:best,e_sharpen:70,w_1600',
	thumbnail: 'c_scale,q_auto:best,w_600',
};

export type Size = $Keys<typeof SIZES>;

export const getPhotoUrl = (name: string, size: $Keys<typeof SIZES>) =>
	`https://res.cloudinary.com/morningphotos/image/upload/${SIZES[size]}/photos/${name}.jpg`;
