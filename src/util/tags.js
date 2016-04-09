import { errorInlineHtml } from 'fledermaus/lib/util';
import { slugify } from './gallery';
import sizes from './../data/sizes';
import Photo from '../../templates/components/Photo';
import PhotoGrid from '../../templates/components/PhotoGrid';

function ratio(slug) {
	if (!slug) {
		return false;
	}
	if (slug.startsWith('http')) {
		return 1.0;
	}
	const { width, height } = sizes[slug].large;
	return width / height;
}

export function group({ children }) {
	const files = children.split('\n');

	let photos;
	try {
		photos = files.map(file => {
			if (file.startsWith('http')) {
				return file;
			}
			const slug = slugify(file);
			if (!sizes[slug]) {
				throw new Error(`Sizes not found for photo: ${slug}`);
			}
			return slug;
		});
	}
	catch (e) {
		return errorInlineHtml(e.message, { block: true });
	}

	let photoIdx = 0;
	let rows = [];
	let threes = [];
	while (photoIdx < photos.length) {
		const slug = photos[photoIdx];
		const next1 = photos[photoIdx + 1];
		const next2 = photos[photoIdx + 2];

		const isThree = ratio(slug) === 1.0 && ratio(next1) === 1.0 && ratio(next2) === 1.0;
		const isPair = ratio(slug) <= 1.0 && ratio(next1) === ratio(slug);

		if (!isThree && threes.length) {
			rows.push(<PhotoGrid>{threes}</PhotoGrid>);
			threes = [];
		}

		if (isThree) {
			// Three square photos
			threes.push(
				<Photo slug={slug} size="small" />,
				<Photo slug={next1} size="small" />,
				<Photo slug={next2} size="small" />
			);
			photoIdx += 2;
		}
		else if (isPair) {
			// Two portrait photos
			rows.push(
				<PhotoGrid>
					<Photo slug={slug} size="small" />
					<Photo slug={next1} size="small" />
				</PhotoGrid>
			);
			photoIdx += 1;
		}
		else {
			// One landscape photo
			rows.push(
				<PhotoGrid>
					<Photo slug={slug} size="medium" />
				</PhotoGrid>
			);
		}
		photoIdx++;
	}

	if (threes.length) {
		rows.push(<PhotoGrid>{threes}</PhotoGrid>);
	}

	return rows.join('\n');
}
