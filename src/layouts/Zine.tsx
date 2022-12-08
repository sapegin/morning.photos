import React from 'react';
import { graphql } from 'gatsby';
import { Box, Grid, Stack, Heading, Text, TextContent } from 'tamia';
import { Link } from 'tamia-gatsby-link';
import PageWithTitle from './PageWithTitle';
import Metatags from '../components/Metatags';
import Image from '../components/GridImage';

type Zine = {
	title: string;
	cover: string;
	video: string;
	description: string;
	meta: string;
	price: string;
	soldout: boolean;
	shop: string;
};

type Props = {
	data: {
		markdownRemark: {
			frontmatter: {
				title: string;
				pageTitle: string;
				cover: string;
				zines: Zine[];
			};
			html: string;
		};
	};
	location: {
		pathname: string;
	};
};

export default function ZinePage({
	data: {
		markdownRemark: {
			frontmatter: { title, pageTitle, cover, zines },
			html,
		},
	},
	location: { pathname },
}: Props) {
	console.log(zines);
	return (
		<PageWithTitle url={pathname} title={title} pageTitle={pageTitle} splash={cover} inverted>
			<Stack gap="l">
				<TextContent dangerouslySetInnerHTML={{ __html: html }} />
				{zines.map((zine) => (
					<Stack gap="m" key={title}>
						<Heading level={2}>{zine.title}</Heading>
						<Grid gridColumnGap="l" mb="l" gridTemplateColumns={['1fr', null, '2fr 1fr']}>
							<Stack gap="m">
								<TextContent>
									<Text dangerouslySetInnerHTML={{ __html: zine.description }} />
									<Text variant="small" dangerouslySetInnerHTML={{ __html: zine.meta }} />
								</TextContent>
								{zine.price && !zine.soldout && (
									<Text variant="bold">
										<Link href={zine.shop} target="_blank" rel="noopener">
											Buy for {zine.price} (excluding shipping)
										</Link>
									</Text>
								)}
								{zine.soldout && <Text variant="bold">Sold out</Text>}
								<iframe
									width="560"
									height="315"
									src={zine.video}
									title="YouTube video player"
									frameBorder="0"
									allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
									allowFullScreen
								></iframe>
							</Stack>
							<Box boxShadow="cover">
								<Image
									src={zine.cover}
									alt={`${zine.title} cover`}
									width={1200}
									height={1683}
									responsive={false}
								/>
							</Box>
						</Grid>
					</Stack>
				))}
			</Stack>
		</PageWithTitle>
	);
}

export const Head = ({
	data: {
		markdownRemark: {
			frontmatter: { pageTitle, cover },
		},
	},
	location: { pathname },
}: Props) => {
	return <Metatags slug={pathname} pageTitle={pageTitle} image={cover} />;
};

export const pageQuery = graphql`
	query ZinePage($slug: String!) {
		markdownRemark(fields: { slug: { eq: $slug } }) {
			frontmatter {
				title
				pageTitle
				cover
				zines {
					title
					cover
					video
					description
					meta
					price
					soldout
					shop
				}
			}
			html
		}
	}
`;
