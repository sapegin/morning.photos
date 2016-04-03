import cx from 'classnames';
import { errorInlineHtml } from 'fledermaus/lib/util';
import { slugify } from './gallery';
import sizes from './sizes';
import Photo from '../../templates/components/Photo';

function Grid({ size }, children) {
	return (
		<div class={cx('photo-grid', size && `photo-grid_${size}`)}>
			{children}
		</div>
	);
}

function GridOfThrees(props, children) {
	const size = children.length % 2 === 0 ? 'three-even' : 'three';
	return (
		<Grid size={size}>
			{children}
		</Grid>
	);
}

function GridPhoto({ slug, size }) {
	return (
		<div class="photo-grid__photo">
			<Photo slug={slug} size={size} class="photo-grid__img" />
		</div>
	);
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
	let threes = [];
	while (photoIdx < photos.length) {
		const slug = photos[photoIdx];
		const next1 = photos[photoIdx + 1];
		const next2 = photos[photoIdx + 2];

		const isThree = ratio(slug) === 1.0 && ratio(next1) === 1.0 && ratio(next2) === 1.0;
		const isPair = ratio(slug) <= 1.0 && ratio(next1) === ratio(slug);

		if (!isThree && threes.length) {
			rows.push(<GridOfThrees>{threes}</GridOfThrees>);
			threes = [];
		}

		if (isThree) {
			// Three square photos
			threes.push(
				<GridPhoto slug={slug} size="small" />,
				<GridPhoto slug={next1} size="small" />,
				<GridPhoto slug={next2} size="small" />
			);
			photoIdx += 2;
		}
		else if (isPair) {
			// Two portrait photos
			rows.push(
				<Grid size="pair">
					<GridPhoto slug={slug} size="small" />
					<GridPhoto slug={next1} size="small" />
				</Grid>
			);
			photoIdx += 1;
		}
		else {
			// One landscape photo
			rows.push(
				<Grid>
					<GridPhoto slug={slug} size="medium" />
				</Grid>
			);
		}
		photoIdx++;
	}

	if (threes.length) {
		rows.push(<GridOfThrees>{threes}</GridOfThrees>);
	}

	return rows.join('\n');
}
