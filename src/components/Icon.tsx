import React from 'react';
import { Icon as IconBase } from 'tamia';
import { SpaceProps } from 'styled-system';

type IconInfo = {
	width: number;
	height: number;
	path: string;
	children?: React.ReactNode;
};

const ICONS: { [key: string]: IconInfo } = {
	camera: {
		width: 48,
		height: 36,
		path:
			'M44.188 6h-6.813c-.575 0-1.112-.25-1.5-.675C32.325 1.35 30.988 0 29.538 0H18.85c-1.463 0-2.9 1.35-6.463 5.338A1.99 1.99 0 0 1 10.9 6h-.513V5c0-.55-.45-1-1-1h-3.25c-.55 0-1 .45-1 1v1H4.2C1.987 6 0 7.65 0 9.838v22C0 34.024 1.988 36 4.188 36h40c2.2 0 3.812-1.975 3.812-4.163v-22C48 7.65 46.388 6 44.187 6zM24.5 31.05c-6.288.287-11.463-4.887-11.175-11.175.25-5.488 4.688-9.925 10.175-10.175 6.288-.287 11.462 4.888 11.175 11.175-.25 5.488-4.687 9.925-10.175 10.175zM36 13.25c-.9 0-1.625-.725-1.625-1.625S35.1 10 36 10s1.625.725 1.625 1.625S36.9 13.25 36 13.25z',
		children: <circle cx="24" cy="20.375" r="7.188" />,
	},
	left: {
		width: 21,
		height: 36,
		path: 'M17.841 0L0 17.656l17.841 17.656 2.743-2.722L5.492 17.656l15.11-14.952L17.842 0z',
	},
	right: {
		width: 21,
		height: 36,
		path: 'M2.76 35.312l17.842-17.657L2.761 0 .019 2.721 15.11 17.655 0 32.61l2.76 2.703z',
	},
};

export type IconName = keyof typeof ICONS;

type Props = SpaceProps & {
	icon: IconName;
};

export default function Icon({ icon, ...props }: Props) {
	const { path, width, height, children } = ICONS[icon];
	return (
		<IconBase
			{...props}
			icon={{
				path,
				width,
				height,
			}}
			width={width}
			height={height}
		>
			{children}
		</IconBase>
	);
}
