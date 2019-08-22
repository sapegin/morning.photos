import React from 'react';
import { graphql } from 'gatsby';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import styled from 'styled-components';
import { Box, Row, Column, TextContent } from 'tamia';
import { Link } from 'tamia-gatsby-link';
import Page from './Page';
import Metatags from '../components/Metatags';
import Image from '../components/Image';
import PhotoGrid from '../components/PhotoGrid';
import { getPhotoUrl } from '../util/photos';

const SecondaryPhoto = styled.div`
	padding-bottom: 66.66%; /* Always 3:2 aspect ratio*/
	background-position: center center;
	background-size: cover;
	/* TODO: Use correct color */
	background-color: ${props => props.color};
	background-image: url(${props => getPhotoUrl(props.src, props.modified, 'medium')});
`;

export default ({
	data: {
		mdx: {
			code: { body },
			frontmatter: { title },
		},
	},
	pageContext: { photos },
	location: { pathname },
}) => {
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
						<SecondaryPhoto src={name} modified={modified} color={color} alt={title} />
					</Link>
				))}
				<Box as={TextContent} mb="l">
					<Row narrow>
						<Column width={[1, 1 / 2]}>
							{/* TODO: Color background */}
							<Image src="/images/about/me11.jpg" alt="Artem Sapegin" />
						</Column>
						<Column width={[1, 1 / 2]}>
							<MDXRenderer>{body}</MDXRenderer>
						</Column>
					</Row>
				</Box>
			</PhotoGrid>
		</Page>
	);
};

export const pageQuery = graphql`
	query MainPage($slug: String!) {
		mdx(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
			}
			code {
				body
			}
		}
	}
`;
