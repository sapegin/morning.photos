import block from 'bem-cn';
import SubscribeForm from './SubscribeForm';

const b = block('subscribe-block');

export default function($) {
	const { formTitle, infoText } = $;
	const { __, typo, typoTitle } = $;
	return (
		<div class={b}>
			{formTitle && <div class={b('title')}>{typoTitle(formTitle)}</div>}
			<div class={b('form')}>
				<SubscribeForm {...$} />
			</div>
			<div class={b('info')}>{typo(infoText || __('subscribe.info'))}</div>
		</div>
	);
}
