import React from 'react';
import { Box, themeGet } from 'tamia';
import styled from '@emotion/styled';
import PhotoGrid from './components/PhotoGrid';
import PostPhoto from './components/PostPhoto';
import PostVideo from './components/PostVideo';
import Image from './components/Image';

export const Photo = props => (
	<Box mb="m">
		<PostPhoto {...props} />
	</Box>
);

export const Video = props => (
	<Box mb="l">
		<PostVideo {...props} />
	</Box>
);

const GridContainer = styled.div`
	width: 100vw;
	max-width: 1024px;

	margin-bottom: ${themeGet('space.m')};

	& + & {
		margin-top: -${themeGet('space.m')};
	}
`;

export const Grid = ({ children }) => {
	const files = children.split(/\s+/);
	return (
		<GridContainer>
			<PhotoGrid columns={files.length === 2 ? 2 : undefined}>
				{files.map(url => (
					<Image src={url} size="blog" />
				))}
			</PhotoGrid>
		</GridContainer>
	);
};

// DON'T FORGET TO UPDATE gatsby-config.js!
export default {
	Photo,
	Video,
	Grid,
};
