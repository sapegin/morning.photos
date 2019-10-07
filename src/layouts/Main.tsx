import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import { Stack, Box, TextContent, VisuallyHidden } from 'tamia';
import { Link } from 'tamia-gatsby-link';
import Page from './Page';
import Metatags from '../components/Metatags';
import Image from '../components/Image';
import PhotoGrid from '../components/PhotoGrid';
import { getPhotoUrl } from '../util/photos';
import { Photo } from '../types';

type SecondaryPhotoProps = {
	src: string;
	modified: number;
	color: string;
};

const SecondaryPhoto = styled.div<SecondaryPhotoProps>`
	padding-bottom: 66.66%; /* Always 3:2 aspect ratio*/
	background-position: center center;
	background-size: cover;
	background-color: ${props => props.color};
	background-image: url(${props => getPhotoUrl(props.src, props.modified, 'medium')});
`;

type Props = {
	data: {
		markdownRemark: {
			html: string;
			frontmatter: {
				title: string;
			};
		};
	};
	pageContext: {
		photos: Photo[];
	};
	location: {
		pathname: string;
	};
};

export default function MainPage({
	data: {
		markdownRemark: {
			frontmatter: { title },
			html,
		},
	},
	pageContext: { photos },
	location: { pathname },
}: Props) {
	const [primaryPhoto, ...secondaryPhotos] = photos;
	return (
		<Page title={title} url={pathname}>
			<Metatags
				slug="/"
				title={title}
				image={primaryPhoto.name}
				imageModified={primaryPhoto.modified}
			/>
			<Box position="relative" mb="m">
				<Link href={primaryPhoto.slug}>
					<Image
						src={primaryPhoto.name}
						modified={primaryPhoto.modified}
						color={primaryPhoto.color}
						intrinsicSize={{ width: primaryPhoto.width, height: primaryPhoto.height }}
						size="medium"
						alt={primaryPhoto.title}
					/>
				</Link>
			</Box>
			<PhotoGrid columns={2} mb="l">
				{secondaryPhotos.map(({ slug, name, modified, color, title }) => (
					<Link key={slug} href={slug}>
						<SecondaryPhoto src={name} modified={modified} color={color} />
						<VisuallyHidden>{title}</VisuallyHidden>
					</Link>
				))}
				<Stack as={TextContent} gridColumnGap="m" gridTemplateColumns={['1fr', null, '1fr 1fr']}>
					{/* TODO: Color background */}
					<Image src="/images/about/me11.jpg" alt="Artem Sapegin" />
					<Box px={['m', null, 0]} dangerouslySetInnerHTML={{ __html: html }} />
				</Stack>
			</PhotoGrid>
		</Page>
	);
}

export const pageQuery = graphql`
	query MainPage($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
			}
			html
		}
	}
`;
