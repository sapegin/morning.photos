import { errorInlineHtml } from 'fledermaus/lib/util';
import { getPhotoUrl } from '../../js/util/util';
import { slugify } from '../../src/util/gallery';
import sizes from '../../src/data/sizes';

export default function($) {
	const { slug, size, alt = '' } = $;

	if (slug.startsWith('http') || slug.startsWith('/')) {
		return <img src={slug} alt={alt} class={$.class} />;
	}

	const realSlug = slugify(slug);
	const src = getPhotoUrl(realSlug, size);
	const photoSizes = sizes[realSlug];
	if (!photoSizes) {
		return errorInlineHtml(`Sizes not found for photo: ${realSlug}`);
	}
	const { width, height } = photoSizes[size];
	return (
		<img src={src} width={width} height={height} alt={alt || photoSizes.title} class={$.class} />
	);
}
