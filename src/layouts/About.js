import React from 'react';
import { graphql } from 'gatsby';
import shuffle from 'lodash/shuffle';
import MDXRenderer from 'gatsby-mdx/mdx-renderer';
import { TextContent, Box, Row, Column, Text, Html } from 'tamia';
import Group from 'react-group';
import { Link } from 'tamia-gatsby-link';
import Page from './Page';
import Grid from '../components/Grid';
import PhotoGrid from '../components/PhotoGrid';
import Image from '../components/GridImage';

const getPhotoIndexFactory = max => {
	const indices = shuffle(Array.from(Array(max)).map((v, i) => i));
	return num => indices.splice(0, num);
};

const Photos = ({ indices, alt }) =>
	indices.map(index => <Image key={index} src={`/images/about/me${index}.jpg`} alt={alt} />);

const Links = ({ items }) =>
	items.map(group =>
		group.map(({ href, label }, index) => (
			<Box key={href} as="li" mb={index === group.length - 1 ? 'm' : null}>
				<Link href={href}>{label}</Link>
			</Box>
		))
	);

const List = ({ items }) => (
	<Grid>
		{items.map(column => (
			<TextContent>
				{column.map(group => (
					<Box mb="m">
						{group.current && (
							<Box as={Group} mb="s" separator=", ">
								{group.current.map(item => (
									<Html as="span">{item}</Html>
								))}
							</Box>
						)}
						{group.obsolete && (
							<Text size="xs">
								<Group separator=", ">
									{group.obsolete.map(item => (
										<Html as="del">{item}</Html>
									))}
								</Group>
							</Text>
						)}
					</Box>
				))}
			</TextContent>
		))}
	</Grid>
);

const AboutPage = ({
	data: {
		mdx: {
			frontmatter: { title, pageTitle, numPhotos, about, links, gear, software, copyrights },
			code: { body },
		},
	},
	location: { pathname },
}) => {
	const indices = getPhotoIndexFactory(numPhotos);
	return (
		<Page
			url={pathname}
			title={title}
			pageTitle={pageTitle}
			splash="about.jpg"
			inverted
			textFullWidth
		>
			<Row>
				<Column width={[1, 2 / 3]}>
					<Box as={TextContent} mb="l">
						<MDXRenderer>{body}</MDXRenderer>
					</Box>
				</Column>
				<Column width={[1, 1 / 3]}>
					<Box as="ul" mb="l">
						<Links items={links} />
					</Box>
				</Column>
			</Row>
			<Box as={PhotoGrid} mb="l">
				<Photos indices={indices(3)} alt="" />
				<Image
					span="full"
					src="/images/about/equipment.jpg"
					alt="Artem Sapegin’s photography kit"
					width="1024"
					height="524"
				/>
			</Box>
			<Box mb="l">
				<List items={gear} />
			</Box>
			<Box as={PhotoGrid} mb="l">
				<Photos indices={indices(3)} alt="" />
				<Image
					span="double"
					src="/images/about/workplace.jpg"
					alt="Artem Sapegin’s workplace"
					width="676"
					height="328"
				/>
				<Image
					src="/images/about/iphone.jpg"
					alt="Photo edition in VSCO Cam on iPhone"
					width="328"
					height="328"
				/>
			</Box>
			<Box mb="l">
				<List items={software} />
			</Box>
			<Box as={Text} mb="m" size="s">
				<TextContent as={Html}>{about}</TextContent>
			</Box>
			<Box as={Text} mb="l" size="s">
				<TextContent>
					Photos on this page:{' '}
					<Group separator=", " inline>
						{copyrights.map(item => (
							<Link href={item.link}>{item.label}</Link>
						))}
					</Group>
				</TextContent>
			</Box>
		</Page>
	);
};

export default AboutPage;

export const pageQuery = graphql`
	query AboutPage($slug: String!) {
		mdx(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				pageTitle
				numPhotos
				about
				links {
					href
					label
				}
				gear {
					current
					obsolete
				}
				software {
					current
				}
				copyrights {
					href
					label
				}
			}
			code {
				body
			}
		}
	}
`;
