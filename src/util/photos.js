const URL_PREFIX = 'https://res.cloudinary.com/morningphotos/image/upload';

const SIZES = {
	medium: 'dpr_auto,f_auto,q_auto:best,e_sharpen:90,w_1024,c_fit',
	gallery: 'dpr_auto,f_auto,q_auto:best,e_sharpen:80,w_1600,h_1200,c_fit',
	thumbnail: 'dpr_auto,f_auto,q_auto:good,w_600,c_fit',
	email: 'q_auto:best,e_sharpen:90,w_1024,c_fit',
};

const getAutoTranformation = width => {
	const roundedWidth = 100 * Math.ceil(width / 100);
	const quality = roundedWidth >= 500 ? 'best' : 'good';
	return `dpr_auto,f_auto,q_auto:${quality},w_${roundedWidth},c_fit`;
};

export const getPhotoUrl = (name, timestamp = 1, size) => {
	const tranformation = SIZES[size] || getAutoTranformation(size);
	return `${URL_PREFIX}/${tranformation}/v${Math.floor(timestamp)}/photos/${name}.jpg`;
};
