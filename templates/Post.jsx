import Page from './Page';
import PostMeta from './components/PostMeta';
import SubscribeBox from './components/SubscribeBox';
import Share from './components/Share';

export default function($) {
	const { title, content } = $;
	const { typo, typoTitle, Script, __ } = $;
	return (
		<Page {...$} pageType="essay">
			<div class="content">
				<article class="essay essay_single">
					<header class="essay__header">
						<h2 class="entry-title">
							{typoTitle(title)}
						</h2>
					</header>

					<div class="essay__content entry-content text">
						{typo(content)}
					</div>

					<PostMeta {...$} post={$} />
					<Share {...$} title={title} />
				</article>

				<div class="l-quad-space">
					<SubscribeBox {...$} formTitle={__('subscribe.title')} from="Blog" />
				</div>
			</div>

			<Script src="/build/main.js"/>
		</Page>
	);
}
