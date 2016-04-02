import { errorInlineHtml } from 'fledermaus/lib/util';
import { slugify } from './gallery';
import sizes from './sizes';
import PhotoBase from '../../templates/components/Photo';

/* eslint-disable no-console, no-unused-vars */

// TODO: alts

function Photo({ slug }) {
	return <PhotoBase slug={slug} size="medium" class="entry-photo__photo" />;
}

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
	while (photoIdx < photos.length) {
		const slug = photos[photoIdx];
		const next1 = photos[photoIdx + 1];
		const next2 = photos[photoIdx + 2];

		if (ratio(slug) === 1.0 && ratio(next1) === 1.0 && ratio(next2) === 1.0) {
			// Three square photos
			rows.push(
				<div class="l-row">
					<figure class="entry-photo l-third">
						<Photo slug={slug} />
					</figure>
					<figure class="entry-photo l-third">
						<Photo slug={next1} />
					</figure>
					<figure class="entry-photo l-third">
						<Photo slug={next2} />
					</figure>
				</div>
			);
			photoIdx += 2;
		}
		else if (ratio(slug) < 1.0 && ratio(next1) === ratio(slug)) {
			// Two portrait photos
			rows.push(
				<div class="l-row">
					<figure class="entry-photo l-half">
						<Photo slug={slug} />
					</figure>
					<figure class="entry-photo l-half">
						<Photo slug={next1} />
					</figure>
				</div>
			);
			photoIdx += 1;
		}
		else {
			// One landscape photo
			rows.push(
				<figure class="entry-photo">
					<Photo slug={slug} />
				</figure>
			);
		}
		photoIdx++;
	}

	return rows.join('\n');
}
