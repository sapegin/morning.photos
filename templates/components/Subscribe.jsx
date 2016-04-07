import SubscribeForm from './SubscribeForm';

export default function($) {
	const { __, typo, typoTitle } = $;
	return (
		<div class="subscribe-block">
			<div class="subscribe-block__title">{typoTitle(__('subscribe.title'))}</div>
			<div class="subscribe-block__form">
				<SubscribeForm {...$} />
			</div>
			<div class="subscribe-block__info">{typo(__('subscribe.info'))}</div>
		</div>
	);
}
