// @flow
import React from 'react';
import { VisuallyHidden, themeGet } from 'tamia';
import styled from '@emotion/styled';
import config from '../../config';

const { userId, listId, actionUrl } = config.subscribe;

const noop = () => {};

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

	&::-moz-focus-inner {
		border: 0;
	}

	@media (min-width: ${themeGet('breakpoints.medium')}) {
		border-radius: 0 ${themeGet('radii.base')} ${themeGet('radii.base')} 0;
	}
`;

const Honey = () => (
	<VisuallyHidden aria-hidden="true">
		<input type="text" name={`b_${userId}_${listId}`} tabIndex="-1" value="" onChange={noop} />
	</VisuallyHidden>
);

type Props = {
	from: string,
};

export default ({ from }: Props) => (
	<>
		<Form method="post" action={actionUrl} target="_blank">
			<input type="hidden" name="u" value={userId} />
			<input type="hidden" name="id" value={listId} />
			<input type="hidden" name="SIGNUP" value={from} />
			<Honey />
			<Column as="label">
				<VisuallyHidden>Your email:</VisuallyHidden>
				<EmailInput
					name="MERGE0"
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
