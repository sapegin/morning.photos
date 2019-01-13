import React from 'react';
import { Icon as IconBase } from 'tamia';

const ICONS = {
	close: {
		width: 17,
		height: 17,
		path:
			'M2.042 0L0 2.041l6.46 6.46L0 14.96 2.042 17l6.459-6.458 6.459 6.459 2.042-2.041-6.46-6.46 6.46-6.459L14.96 0 8.5 6.46 2.043 0z',
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

const Icon = ({ icon, ...props }) => {
	const { path, width, height } = ICONS[icon];
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
		/>
	);
};

export default Icon;
