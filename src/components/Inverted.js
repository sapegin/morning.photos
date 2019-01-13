import React from 'react';
import { ThemeProvider } from 'emotion-theming';
import { inverted } from '../theme';

const Inverted = ({ children }) => <ThemeProvider theme={inverted}>{children}</ThemeProvider>;

export default Inverted;
