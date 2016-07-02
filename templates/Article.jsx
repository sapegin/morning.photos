import PageWithTitle from './PageWithTitle';
import Share from './components/Share';
import SubscribePopup from './components/SubscribePopup';

export default function($, children) {
	const { content } = $;
	const { typo, Script } = $;
	return (
		<PageWithTitle {...$}>
			<div class="text">
				{typo(content)}

				<Share {...$} />
			</div>

			<SubscribePopup {...$} />
			<Script src="/build/main.js" />
		</PageWithTitle>
	);
}
