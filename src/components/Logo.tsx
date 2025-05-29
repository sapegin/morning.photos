import { Link } from './Link';
import { Text } from './Text';

export function Logo() {
	return (
		<Text variant="menu">
			<Link
				href="/"
				display="inline-flex"
				flexDirection="column"
				css={{
					display: 'inline-block',
					fontWeight: 'bold',
					textDecoration: 'none',
					background: `linear-gradient(token(colors.gradient), token(colors.primary))`,
					backgroundClip: 'text',
					WebkitTextFillColor: 'transparent',
					transitionDuration: 'hover',
					transitionTimingFunction: 'hover',
					transitionProperty: 'all',
					_hover: {
						color: 'primary',
						textDecoration: 'underline',
					},
				}}
			>
				Morning.photos
			</Link>
		</Text>
	);
}
