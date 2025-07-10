import type { Photo } from '../types/Photo';

const URL_PREFIX = 'https://res.cloudinary.com/morningphotos/image/upload';

const SIZES = {
	small: 'dpr_auto,f_auto,q_auto:best,e_sharpen:80,w_828,c_fit',
	medium: 'dpr_auto,f_auto,q_auto:best,e_sharpen:80,w_1024,c_fit',
	thumbnail: 'dpr_auto,f_auto,q_auto:good,w_600,c_fit',
} as const;

export type Size = keyof typeof SIZES;

const getAutoTransformation = (width: number): string => {
	const roundedWidth = 100 * Math.ceil(width / 100);
	const quality = roundedWidth >= 500 ? 'best' : 'good';
	return `dpr_auto,f_auto,q_auto:${quality},w_${roundedWidth},c_fit`;
};

/**
 * Return photo URL on Cloudinary.
 */
export function getPhotoUrl(photo: Photo, size?: Size): string {
	const timestamp = photo?.timestamp ? photo.timestamp.getTime() : 0;
	const transformation =
		typeof size === 'number'
			? getAutoTransformation(size)
			: SIZES[size as Size];
	return `${URL_PREFIX}/${transformation}/v${timestamp}/photos/${photo.name}.jpg`;
}
