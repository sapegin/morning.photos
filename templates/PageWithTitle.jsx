import Page from './Page';
import PageTitle from './components/PageTitle';

export default function($, children) {
	const { content } = $;
	const { typo } = $;
	return (
		<Page {...$}>
			<div class="content entry-content">
				<PageTitle {...$} />
				{children.length ? children : typo(content)}
			</div>
		</Page>
	);
}
