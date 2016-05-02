import PageWithTitle from './PageWithTitle';
import SubscribeForm from './components/SubscribeForm';

export default function($) {
	const { content } = $;
	const { typo } = $;
	return (
		<PageWithTitle {...$}>
			<div class="subscribe-page">
				<SubscribeForm {...$} from="Subscribe" extra={{ autofocus: true }} />
			</div>

			<div class="text">{typo(content)}</div>
		</PageWithTitle>
	);
}
