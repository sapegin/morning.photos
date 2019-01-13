import React from 'react';
import Group from 'react-group';
import { Box, Heading, Text } from 'tamia';

export default ({ title, caption, location, formattedDate, exif }) => {
	return (
		<>
			<Box mb="m">
				<Heading level={1} mb="s">
					{title}
				</Heading>
				{caption && <Text size="m">{caption}</Text>}
			</Box>
			<Text size="xs">
				<Group separator=", " is="span">
					{location}
					{formattedDate}
					{exif}
				</Group>
			</Text>
		</>
	);
};
