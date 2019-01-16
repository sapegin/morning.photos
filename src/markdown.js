import React from 'react';
import { Box } from 'tamia';
import PhotoBase from './components/PostPhoto';

export const Photo = props => (
	<Box mb="m">
		<PhotoBase {...props} />
	</Box>
);

export default {
	Photo,
};
