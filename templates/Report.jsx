import PageWithTitle from './PageWithTitle';
import Share from './components/Share';

export default function($) {
	const { content, title } = $;
	const { typo, Script, __ } = $;
	return (
		<PageWithTitle {...$} pageType="report">
			<div class="text">
				{typo(content)}
			</div>
			<Share {...$} title={`${title} — photos by Artem Sapegin`} />
			<Script src="/build/main.js" />
		</PageWithTitle>
	);
}
