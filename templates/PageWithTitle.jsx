import flow from 'lodash/flow';
import Page from './Page';
import PageTitle from './components/PageTitle';

export default function($, children) {
	const { content } = $;
	const { typo, safe } = $;
	return (
		<Page {...$}>
			<div class="content entry-content">
				<PageTitle {...$} />
				{children.length ? children : flow(typo, safe)(content)}
			</div>
		</Page>
	);
}
