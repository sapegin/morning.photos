import flow from 'lodash/flow';
import PageWithTitle from './PageWithTitle';

export default function($) {
	return (
		<PageWithTitle {...$} pageType="report">
			<div class="text">
				{flow($.typo, $.safe)($.content)}
			</div>
		</PageWithTitle>
	);
}
