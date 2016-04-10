import PageWithTitle from './PageWithTitle';
import Share from './components/Share';

export default function($, children) {
	const { content } = $;
	const { typo, Script } = $;
	return (
		<PageWithTitle {...$}>
			<div class="text">
				{typo(content)}

				<div class="l-triple-space">
					<Share {...$} />
				</div>
			</div>

			<Script src="/build/main.js" />
		</PageWithTitle>
	);
}
