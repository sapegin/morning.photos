import React from 'react';
import { Box } from 'tamia';
import RehypeReact from 'rehype-react';
import PhotoBase from './components/PostPhoto';

const Photo = props => (
	<Box mb="m">
		<PhotoBase {...props} />
	</Box>
);

export const renderAst = new RehypeReact({
	createElement: React.createElement,
	components: {
		'x-photo': Photo,
	},
}).Compiler;
