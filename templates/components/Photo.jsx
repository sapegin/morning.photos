import { errorInlineHtml } from 'fledermaus/lib/util';
import { getPhotoUrl } from '../../js/util/util';
import sizes from '../../src/util/sizes';

export default function($) {
	const { slug, size, alt = '' } = $;

	if (slug.startsWith('http')) {
		return (
			<img src={slug} alt={alt} class={$.class} />
		);
	}

	const src = getPhotoUrl(slug, size);
	const photoSizes = sizes[slug];
	if (!photoSizes) {
		return errorInlineHtml(`Sizes not found for photo: ${slug}`);
	}
	const { width, height } = photoSizes[size];
	return (
		<img src={src} width={width} height={height} alt={alt || photoSizes.title} class={$.class} />
	);
}
