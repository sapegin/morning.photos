import SubscribeForm from './SubscribeForm';

export default function($) {
	const { formTitle, infoText, buttonLabel } = $;
	const { __, typo, typoTitle } = $;
	return (
		<div class="subscribe-block js-subscribe-block" id="subscribe">
			<div class="subscribe-block__title">{formTitle || typoTitle(__('subscribe.title'))}</div>
			<div class="subscribe-block__form">
				<SubscribeForm {...$} />
			</div>
			<div class="subscribe-block__info">{infoText || typo(__('subscribe.info'))}</div>
		</div>
	);
}
