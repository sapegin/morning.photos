import React from 'react';
import Group from 'react-group';
import { Box, Heading, Text, VisuallyHidden } from 'tamia';

export default ({ title, caption, location, formattedDate, exif, keywords }) => {
	return (
		<>
			<Box mb="m">
				<Heading level={1} mb="s">
					{title}
				</Heading>
				{caption && <Text size="m">{caption}</Text>}
			</Box>
			<Text size="xs">
				<Group separator=", ">
					{location}
					{formattedDate}
					{exif}
				</Group>
			</Text>
			<VisuallyHidden>Keywords: {keywords.join(', ')}</VisuallyHidden>
		</>
	);
};
