import React from 'react';
import PropTypes from 'prop-types';
import { Page as PageBase, Box, Container } from 'tamia';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Splash from '../components/Splash';
import Base from './Base';

type Props = {
	children: React.ReactNode;
	url: string;
	splash?: string;
	inverted?: boolean;
	fullWidth?: boolean;
};

const PageWrapper = ({ fullWidth, children }: Pick<Props, 'fullWidth' | 'children'>) =>
	fullWidth ? (
		<Box py="s" px="m">
			{children}
		</Box>
	) : (
		<Container>{children}</Container>
	);

const Page = ({ children, url, splash, inverted, fullWidth }: Props) => {
	return (
		<Base>
			<PageWrapper fullWidth={fullWidth}>
				<PageBase>
					<Box mb="m">
						{splash ? (
							<Splash src={splash} inverted={inverted}>
								<Header url={url} />
							</Splash>
						) : (
							<Header url={url} />
						)}
					</Box>
					<Box as="main" role="main" mb="l">
						{children}
					</Box>
					<PageBase.Footer as="div">
						<Footer />
					</PageBase.Footer>
				</PageBase>
			</PageWrapper>
		</Base>
	);
};

Page.propTypes = {
	children: PropTypes.node.isRequired,
	url: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default Page;
