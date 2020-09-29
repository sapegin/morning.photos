/* eslint-disable @typescript-eslint/camelcase */

const fs = require('fs-extra');
const cloudinary = require('cloudinary').v2;

// These functions require CLOUDINARY_URL environment variable, like:
// CLOUDINARY_URL=cloudinary://XXX:YYY@ZZZ
// You can find it in the Cloudinary console: https://cloudinary.com/console/

module.exports.uploadPhoto = filepath => {
	return new Promise((resolve, reject) => {
		if (!process.env.CLOUDINARY_URL) {
			reject('CLOUDINARY_URL environmental variable is required for upload');
			return;
		}

		const { size } = fs.statSync(filepath);
		if (size > 10_000_000) {
			reject('File is larger than 10 MB');
			return;
		}

		cloudinary.uploader.upload(
			filepath,
			{
				folder: 'photos/',
				use_filename: true,
				unique_filename: false,
				resource_type: 'auto',
			},
			(error, result) => {
				if (error) {
					reject(error);
				}
				resolve(result);
			}
		);
	});
};
