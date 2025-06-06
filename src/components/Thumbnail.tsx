import { css } from '../../styled-system/css';
import type { Photo } from '../types/Photo';
import { getPhotoUrl } from '../util/getPhotoUrl';

/**
 * Render a Photo object.
 * - Basic responsiveness
 * - Lazy loaded
 * - Fallback to dominant color
 */
export function Thumbnail({ photo }: { photo: Photo }) {
	return (
		<img
			src={getPhotoUrl(photo, 'thumbnail')}
			width={photo.width}
			height={photo.height}
			alt=""
			loading="lazy"
			className={css({
				width: '100%',
				height: 'auto',
			})}
			style={{ backgroundColor: photo.color }}
		/>
	);
}
