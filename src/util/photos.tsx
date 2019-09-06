const URL_PREFIX = 'https://res.cloudinary.com/morningphotos/image/upload';

const SIZES = {
	medium: 'dpr_auto,f_auto,q_auto:best,e_sharpen:90,w_1024,c_fit',
	gallery: 'dpr_auto,f_auto,q_auto:best,e_sharpen:80,w_1600,h_1200,c_fit',
	thumbnail: 'dpr_auto,f_auto,q_auto:good,w_600,c_fit',
	email: 'q_auto:best,e_sharpen:90,w_1024,c_fit',
} as const;

export type Size = keyof typeof SIZES;

const getAutoTransformation = (width: number): string => {
	const roundedWidth = 100 * Math.ceil(width / 100);
	const quality = roundedWidth >= 500 ? 'best' : 'good';
	return `dpr_auto,f_auto,q_auto:${quality},w_${roundedWidth},c_fit`;
};

export function getPhotoUrl(name: string, timestamp?: number, size?: Size): string;
export function getPhotoUrl(name: string, timestamp?: number, size?: number): string;
export function getPhotoUrl(name: any, timestamp = 1, size: any): any {
	const transformation =
		typeof size === 'number' ? getAutoTransformation(size) : SIZES[size as Size];
	return `${URL_PREFIX}/${transformation}/v${Math.floor(timestamp)}/photos/${name}.jpg`;
}
