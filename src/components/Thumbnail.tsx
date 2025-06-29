import { css } from '../../styled-system/css';
import type { Photo } from '../types/Photo';
import { getPhotoUrl, type Size } from '../util/getPhotoUrl';

/**
 * Render a Photo object.
 * - Basic responsiveness
 * - Lazy loaded
 * - Fallback to dominant color
 */
export function Thumbnail({
	photo,
	size = 'thumbnail',
	alt,
}: {
	photo: Photo;
	size?: Size;
	alt?: string;
}) {
	return (
		<img
			src={getPhotoUrl(photo, size)}
			width={photo.width}
			height={photo.height}
			alt={alt ?? ''}
			loading="lazy"
			className={css({
				width: '100%',
				height: 'auto',
			})}
			style={{ backgroundColor: photo.color }}
		/>
	);
}
