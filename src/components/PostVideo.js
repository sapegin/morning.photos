// @flow
import React from 'react';
import styled from '@emotion/styled';
import { themeGet } from 'tamia';

// Based on
// http://www.smashingmagazine.com/2014/02/27/making-embedded-content-work-in-responsive-design/

const Container = styled.div`
	position: relative;
	height: 0;
	/* 16×9 */
	padding-bottom: 56.25%;
	/* Allow space for the chrome — this is specific to YouTube videos */
	padding-top: 35px;
	overflow: hidden;

	margin-left: -${themeGet('page.xPadding')};
	margin-right: -${themeGet('page.xPadding')};

	@media (min-width: ${themeGet('breakpoints.huge')}) {
		margin-left: 0;
		margin-right: 0;
	}
`;

const Iframe = styled.iframe`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

type Props = {
	src: string,
	height?: number,
};

export default ({ src, height = 576 }: Props) => (
	<Container>
		<Iframe width="1024" height={height} src={src} frameBorder="0" allowFullScreen />
	</Container>
);
