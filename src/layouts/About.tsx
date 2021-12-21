import React from 'react';
import { graphql } from 'gatsby';
import shuffle from 'array-shuffle';
import { TextContent, Box, Grid, Text } from 'tamia';
import Group from 'react-group';
import { Link } from 'tamia-gatsby-link';
import PageWithTitle from './PageWithTitle';
import Metatags from '../components/Metatags';
import PhotoGrid from '../components/PhotoGrid';
import Image from '../components/GridImage';

type Item = {
	href: string;
	label: string;
};

type Indices = number[];

type PhotosProps = {
	indices: Indices;
	alt: string;
};

const getPhotoIndexFactory = (max: number) => {
	const indices: Indices = shuffle(Array.from(Array(max)).map((v, i) => i));
	return (num: number) => indices.splice(0, num);
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
			frontmatter: { title, pageTitle, cover, numPhotos, about, links, copyrights },
			html,
		},
	},
	location: { pathname },
}: Props) {
	const indices = getPhotoIndexFactory(numPhotos);
	return (
		<PageWithTitle url={pathname} title={title} pageTitle={pageTitle} splash={cover} inverted>
			<Metatags slug={pathname} title={title} image={cover} />
			<Grid gridColumnGap="l" mb="l" gridTemplateColumns={['1fr', null, '2fr 1fr']}>
				<TextContent dangerouslySetInnerHTML={{ __html: html }} />
				<Links items={links} />
			</Grid>
			<Box as={PhotoGrid} mb="l">
				<Photos indices={indices(3)} alt="" />
				<Image
					src="/images/about/iphone.jpg"
					alt="Photo editing in VSCO Cam on iPhone"
					width={331}
					height={331}
					responsive={false}
				/>
				<Image
					span="double"
					src="/images/about/workplace.jpg"
					alt="Artem Sapegin’s workplace"
					width={677}
					height={331}
					responsive={false}
				/>
				<Photos indices={indices(3)} alt="" />
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
				copyrights {
					href
					label
				}
			}
			html
		}
	}
`;
