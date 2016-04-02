import flow from 'lodash/flow';
import Page from './Page';

export default function($, children) {
	return (
		<Page {...$}>
			<div class="content entry-content">
				<div class="entry-header">
					<h1 class="entry-title">{$.typoTitle($.title)}</h1>
					{$.description &&
						<div class="entry-excerpt">${flow($.typo, $.safe)($.description)}</div>
					}
				</div>
				{children.length ? children : flow($.typo, $.safe)($.content)}
			</div>
		</Page>
	);
}
