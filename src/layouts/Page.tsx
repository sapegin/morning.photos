import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Page as PageBase, Box, Container } from 'tamia';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Splash from '../components/Splash';
import Base from './Base';

type Props = {
	children: React.ReactNode;
	url: string;
	title: string;
	pageTitle?: string;
	splash?: string;
	inverted?: boolean;
	fullWidth?: boolean;
};

const Page = ({ children, url, title, pageTitle, splash, inverted, fullWidth }: Props) => {
	const PageWrapper = fullWidth ? React.Fragment : Container;
	return (
		<Base>
			<PageWrapper>
				<PageBase>
					<Helmet title={pageTitle || title} />
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
