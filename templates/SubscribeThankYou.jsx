import PageWithTitle from './PageWithTitle';

export default function($) {
	const { content } = $;
	const { __, typo } = $;
	return (
		<PageWithTitle {...$}>
			<div class="text">{typo(content)}</div>
		</PageWithTitle>
	);
}
