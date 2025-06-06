import { css } from '../../styled-system/css';
import type { Photo } from '../types/Photo';
import { getPhotoUrl } from '../util/getPhotoUrl';
import { Flex } from './Flex';

/**
 * Render a Photo object.
 * - Responsive with max height
 * - Lazy loaded
 * - Fallback to dominant color
 */
export function Photograph({ photo }: { photo: Photo }) {
	return (
		<Flex
			mx="auto"
			justifyContent="center"
			flexShrink="1"
			maxWidth={{
				base: '100%',
				tablet: 'min(100%, calc(100vw - (token(spacing.m) * 2)))',
			}}
			maxHeight={{
				base: 'min(900px, 100vh)',
				tablet: 'min(900px, calc(100vh - (token(spacing.m) * 2)))',
			}}
		>
			<img
				src={getPhotoUrl(photo, 'medium')}
				width={photo.width}
				height={photo.height}
				alt={
					photo.title ? `${photo.title} (${photo.location})` : photo.location
				}
				loading="lazy"
				className={css({
					width: 'auto',
					height: 'auto',
					maxWidth: '100%',
					maxHeight: '100%',
				})}
				style={{
					backgroundColor: photo.color,
				}}
			/>
		</Flex>
	);
}
