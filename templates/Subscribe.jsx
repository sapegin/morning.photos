import Page from './Page';
import PageTitle from './components/PageTitle';
import SubscribeForm from './components/SubscribeForm';
import Splash from './components/Splash';

export default function($) {
	const { content, note } = $;
	const { typo, Script } = $;
	return (
		<Page {...$} pageType={['inverted-head', 'has-splash']}>
			<Splash src="/images/subscribe.jpg" />

			<div class="content entry-content">
				<PageTitle {...$} />

				<div class="text">{typo(content)}</div>

				<div class="l-quad-space">
					<SubscribeForm {...$} from="Subscribe" extra={{ autofocus: true }} />
					<div class="note">{typo(note)}</div>
				</div>
			</div>

			<Script src="/build/main.js"/>
		</Page>
	);
}
