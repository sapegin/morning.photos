import PageWithTitle from './PageWithTitle';
import Share from './components/Share';

export default function($) {
	const { content } = $;
	const { __, typo, Script } = $;
	return (
		<PageWithTitle {...$}>
			<div class="text">{typo(content)}</div>

			<Share {...$} title={__('titleLong')} url="/" />

			<Script src="/build/main.js"/>
		</PageWithTitle>
	);
}
