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
			<div class="l-triple-space">
				<Share {...$} title={`${title} — photos by Artem Sapegin`} />
			</div>
			<Script src="/build/main.js" />
		</PageWithTitle>
	);
}
