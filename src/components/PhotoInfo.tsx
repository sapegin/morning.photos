import React from 'react';
import Group from 'react-group';
import { Box, Heading, Text, VisuallyHidden } from 'tamia';

type Props = {
	title: string;
	caption?: string;
	location?: string;
	formattedDate?: string;
	keywords: string[];
};

export default function PhotoInfo({ title, caption, location, formattedDate, keywords }: Props) {
	return (
		<>
			<Box mb="m">
				<Heading level={1} mb="s">
					{title}
				</Heading>
				{caption && <Text>{caption}</Text>}
			</Box>
			<Text variant="small">
				<Group separator=", ">
					{location}
					{formattedDate}
				</Group>
			</Text>
			<VisuallyHidden>Keywords: {keywords.join(', ')}</VisuallyHidden>
		</>
	);
}
