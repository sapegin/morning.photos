import flow from 'lodash/flow';
import PageWithTitle from './PageWithTitle';
import Subscribe from './components/Subscribe';

export default function($) {
	const { content } = $;
	const { typo, safe } = $;
	return (
		<PageWithTitle {...$}>
			<div class="subscribe-page">
				<Subscribe {...$} from="Subscribe" extra={{ autofocus: true }} />
			</div>

			<div class="text">{flow(typo, safe)(content)}</div>
		</PageWithTitle>
	);
}
