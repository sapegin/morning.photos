import Page from './Page';
import PageTitle from './components/PageTitle';
import SubscribeBlock from './components/SubscribeBlock';
import Splash from './components/Splash';

export default function($) {
	const { content } = $;
	const { typo, Script } = $;
	return (
		<Page {...$} pageType={['inverted-head', 'has-splash']}>
			<Splash src="/images/subscribe.jpg" />

			<div class="content entry-content">
				<div class="content-holder">
					<PageTitle {...$} />

					<div class="text">{typo(content)}</div>

					<div class="l-quad-space">
						<SubscribeBlock {...$} from="Subscribe" extra={{ autofocus: true }} />
					</div>
				</div>
			</div>

			<Script src="/build/main.js"/>
		</Page>
	);
}
