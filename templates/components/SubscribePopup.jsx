import block from 'bem-cn';
import SubscribeBlock from './SubscribeBlock';

const b = block('subscribe-popup');

export default function($) {
	const { from } = $;
	const { __, typo, typoTitle } = $;
	return (
		<u-subscribe-popup id="subscribe">
			<div class={b.is({ hidden: true }).mix('js-subscribe-container')}>
				<div class={b('container').mix('content')}>
					<button class={b('close').mix('js-subscribe-close')}>&times;</button>
					<SubscribeBlock
						{...$}
						formTitle={__('subscribe.title')}
						from={`Popup:${from}`}
					/>
				</div>
			</div>
		</u-subscribe-popup>
	);
}
