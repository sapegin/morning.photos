import React from 'react';
import { VisuallyHidden, themeGet } from 'tamia';
import styled from '@emotion/styled';

const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
`;

const Column = styled.div`
	width: 100%;

	@media (min-width: ${themeGet('breakpoints.medium')}) {
		width: auto;
	}
`;

const EmailInput = styled.input`
	width: 100%;
	height: 2em;
	padding: ${themeGet('space.s')};
	background-color: ${themeGet('colors.bg')};
	color: ${themeGet('colors.base')};
	border: 2px solid ${themeGet('colors.primary')};
	border-radius: ${themeGet('radii.base')} ${themeGet('radii.base')} 0 0;
	font-size: ${themeGet('fontSizes.l')};
	font-family: ${themeGet('fonts.base')};
	appearance: none;

	&:focus {
		outline: 0;
		border-color: ${themeGet('colors.hover')};
	}

	@media (min-width: ${themeGet('breakpoints.medium')}) {
		border-radius: ${themeGet('radii.base')} 0 0 ${themeGet('radii.base')};
	}
`;

const SubmitButton = styled.button`
	width: 100%;
	height: 2em;
	padding: ${themeGet('space.s')} ${themeGet('space.m')};
	background-color: ${themeGet('colors.base')};
	color: ${themeGet('colors.bg')};
	border: 2px solid ${themeGet('colors.primary')};
	border-radius: 0 0 ${themeGet('radii.base')} ${themeGet('radii.base')};
	font-size: ${themeGet('fontSizes.l')};
	font-family: ${themeGet('fonts.base')};
	user-select: none;

	&:hover,
	&:active,
	&:focus {
		outline: 0;
		background-color: ${themeGet('colors.hover')};
		border-color: ${themeGet('colors.hover')};
		cursor: pointer;
	}

	/* stylelint-disable-next-line no-descending-specificity */
	&::-moz-focus-inner {
		border: 0;
	}

	@media (min-width: ${themeGet('breakpoints.medium')}) {
		border-radius: 0 ${themeGet('radii.base')} ${themeGet('radii.base')} 0;
	}
`;

export default () => (
	<>
		<Form
			method="post"
			action="https://buttondown.email/api/emails/embed-subscribe/sapegin"
			target="_blank"
		>
			<Column as="label">
				<VisuallyHidden>Your email:</VisuallyHidden>
				<EmailInput
					name="email"
					type="email"
					required
					autocomplete="home email"
					autocapitalize="off"
					autocorrect="off"
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
