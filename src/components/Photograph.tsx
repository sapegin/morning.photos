import { css } from '../../styled-system/css';
import type { Photo } from '../types/Photo';
import { getPhotoUrl } from '../util/getPhotoUrl';

/**
 * Render a Photo object.
 * - Responsive with max height
 * - Lazy loaded
 * - Fallback to dominant color
 */
export function Photograph({ photo }: { photo: Photo }) {
	return (
		<img
			src={getPhotoUrl(photo, 'medium')}
			width={photo.width}
			height={photo.height}
			alt={photo.title}
			loading="lazy"
			className={css({
				width: 'auto',
				height: 'auto',
				maxWidth: {
					base: '100%',
					tablet: 'min(100%, calc(100vw - token(spacing.m)))',
				},
				maxHeight: {
					base: 'min(900px, 100vh)',
					tablet: 'min(900px, calc(100vh - token(spacing.m)))',
				},
			})}
			style={{ backgroundColor: photo.color }}
		/>
	);
}
