import React from 'react';
import { VisuallyHidden } from 'tamia';
import styled from 'styled-components';

const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
`;

const Column = styled.div`
	width: 100%;

	@media (min-width: ${p => p.theme.breakpoints[1]}) {
		width: auto;
	}
`;

const EmailInput = styled.input`
	width: 100%;
	height: 2em;
	padding: ${p => p.theme.space.s};
	background-color: ${p => p.theme.colors.bg};
	color: ${p => p.theme.colors.base};
	border: 2px solid ${p => p.theme.colors.primary};
	border-radius: ${p => p.theme.radii.base} ${p => p.theme.radii.base} 0 0;
	font-size: ${p => p.theme.fontSizes.l};
	font-family: ${p => p.theme.fonts.base};
	appearance: none;

	&:focus {
		outline: 0;
		border-color: ${p => p.theme.colors.hover};
	}

	@media (min-width: ${p => p.theme.breakpoints[1]}) {
		border-radius: ${p => p.theme.radii.base} 0 0 ${p => p.theme.radii.base};
	}
`;

const SubmitButton = styled.button`
	width: 100%;
	height: 2em;
	padding: ${p => p.theme.space.s} ${p => p.theme.space.m};
	background-color: ${p => p.theme.colors.base};
	color: ${p => p.theme.colors.bg};
	border: 2px solid ${p => p.theme.colors.primary};
	border-radius: 0 0 ${p => p.theme.radii.base} ${p => p.theme.radii.base};
	font-size: ${p => p.theme.fontSizes.l};
	font-family: ${p => p.theme.fonts.base};
	user-select: none;

	&:hover,
	&:active,
	&:focus {
		outline: 0;
		background-color: ${p => p.theme.colors.hover};
		border-color: ${p => p.theme.colors.hover};
		cursor: pointer;
	}

	/* stylelint-disable-next-line no-descending-specificity */
	&::-moz-focus-inner {
		border: 0;
	}

	@media (min-width: ${p => p.theme.breakpoints[1]}) {
		border-radius: 0 ${p => p.theme.radii.base} ${p => p.theme.radii.base} 0;
	}
`;

export default () => (
	<>
		<Form method="post" action="https://buttondown.email/api/emails/embed-subscribe/sapegin">
			<Column as="label">
				<VisuallyHidden>Your email:</VisuallyHidden>
				<EmailInput
					name="email"
					type="email"
					required
					autoComplete="home email"
					autoCapitalize="off"
					autoCorrect="off"
					placeholder="Your email"
					defaultValue=""
				/>
			</Column>
			<Column>
				<SubmitButton type="submit">Subscribe</SubmitButton>
			</Column>
		</Form>
	</>
);
