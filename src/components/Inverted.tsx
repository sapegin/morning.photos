import React from 'react';
import { ThemeProvider } from 'styled-components';
import { inverted } from '../theme';

type Props = {
	children: React.ReactChild;
};

export default function Inverted({ children }: Props) {
	return <ThemeProvider theme={inverted}>{children}</ThemeProvider>;
}
