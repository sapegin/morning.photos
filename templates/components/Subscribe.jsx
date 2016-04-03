import flow from 'lodash/flow';
import SubscribeForm from './SubscribeForm';

export default function($) {
	const { safe, option, typo, typoTitle } = $;
	return (
		<div class="subscribe-block">
			<div class="subscribe-block__title">{flow(option, typoTitle, safe)('subscribe.title')}</div>
			<div class="subscribe-block__form">
				<SubscribeForm {...$} />
			</div>
			<div class="subscribe-block__info">{flow(option, typo, safe)('subscribe.info')}</div>
		</div>
	);
}
