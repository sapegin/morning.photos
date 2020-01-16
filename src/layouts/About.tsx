import React from 'react';
import { graphql } from 'gatsby';
import shuffle from 'array-shuffle';
import { TextContent, Box, Stack, Text } from 'tamia';
import Group from 'react-group';
import { Link } from 'tamia-gatsby-link';
import PageWithTitle from './PageWithTitle';
import Metatags from '../components/Metatags';
import Grid from '../components/Grid';
import PhotoGrid from '../components/PhotoGrid';
import Image from '../components/GridImage';

type Item = {
	href: string;
	label: string;
};
type ListGroup = {
	current?: string[];
	obsolete?: string[];
};
type Indices = number[];

const getPhotoIndexFactory = (max: number) => {
	const indices: Indices = shuffle(Array.from(Array(max)).map((v, i) => i));
	return (num: number) => indices.splice(0, num);
};

type PhotosProps = {
	indices: Indices;
	alt: string;
};

const Photos = React.memo(
	({ indices, alt }: PhotosProps) => (
		<>
			{indices.map(index => (
				<Image
					key={index}
					src={`/images/about/me${index}.jpg`}
					alt={alt}
					responsive={false}
					intrinsicSize={{ width: 1, height: 1 }}
				/>
			))}
		</>
	),
	// Never rerender photos to avoid downloading two different images on SSR and client
	() => false
);

type LinksProps = {
	items: Item[][];
};

const Links = ({ items }: LinksProps) => (
	<ul>
		{items.map(group =>
			group.map(({ href, label }, index) => (
				<Box key={href} as="li" mb={index === group.length - 1 ? 'm' : undefined}>
					<Link href={href}>{label}</Link>
				</Box>
			))
		)}
	</ul>
);

type ListProps = {
	items: ListGroup[][];
};

const List = ({ items }: ListProps) => (
	<Grid>
		{items.map((column, columnIndex) => (
			<TextContent key={columnIndex}>
				{column.map((group, groupIndex) => (
					<Box key={groupIndex} mb="m">
						{group.current && (
							<Box as={Text} mb="s">
								<Group separator=", ">
									{group.current.map(item => (
										<span key={item} dangerouslySetInnerHTML={{ __html: item }} />
									))}
								</Group>
							</Box>
						)}
						{group.obsolete && (
							<Text variant="small">
								<Group separator=", ">
									{group.obsolete.map(item => (
										<del key={item} dangerouslySetInnerHTML={{ __html: item }} />
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

type Props = {
	data: {
		markdownRemark: {
			frontmatter: {
				title: string;
				pageTitle: string;
				cover: string;
				numPhotos: number;
				about: string;
				links: Item[][];
				gear: ListGroup[][];
				software: ListGroup[][];
				copyrights: Item[];
			};
			html: string;
		};
	};
	location: {
		pathname: string;
	};
};

export default function AboutPage({
	data: {
		markdownRemark: {
			frontmatter: { title, pageTitle, cover, numPhotos, about, links, gear, software, copyrights },
			html,
		},
	},
	location: { pathname },
}: Props) {
	const indices = getPhotoIndexFactory(numPhotos);
	return (
		<PageWithTitle url={pathname} title={title} pageTitle={pageTitle} splash={cover} inverted>
			<Metatags slug={pathname} title={title} image={cover} />
			<Stack gridColumnGap="l" mb="l" gridTemplateColumns={['1fr', null, '2fr 1fr']}>
				<TextContent dangerouslySetInnerHTML={{ __html: html }} />
				<Links items={links} />
			</Stack>
			<Box as={PhotoGrid} mb="l">
				<Photos indices={indices(3)} alt="" />
				<Image
					span="full"
					src="/images/about/equipment.jpg"
					alt="Artem Sapegin’s photography kit"
					width={1024}
					height={524}
					responsive={false}
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
					width={677}
					height={331}
					responsive={false}
				/>
				<Image
					src="/images/about/iphone.jpg"
					alt="Photo editing in VSCO Cam on iPhone"
					width={331}
					height={331}
					responsive={false}
				/>
			</Box>
			<Box mb="l">
				<List items={software} />
			</Box>
			<Box as={TextContent} mb="m">
				<Text variant="small" dangerouslySetInnerHTML={{ __html: about }} />
			</Box>
			<Box as={TextContent} mb="l">
				<Text variant="small">
					Photos on this page:{' '}
					<Group separator=", ">
						{copyrights.map(item => (
							<Link key={item.href} href={item.href}>
								{item.label}
							</Link>
						))}
					</Group>
				</Text>
			</Box>
		</PageWithTitle>
	);
}

export const pageQuery = graphql`
	query AboutPage($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				pageTitle
				cover
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
			html
		}
	}
`;
