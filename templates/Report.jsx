import PageWithTitle from './PageWithTitle';

export default function($) {
	const { content } = $;
	const { typo } = $;
	return (
		<PageWithTitle {...$} pageType="report">
			<div class="text">
				{typo(content)}
			</div>
		</PageWithTitle>
	);
}
