import Page from './Page';
import PostMeta from './components/PostMeta';
import Script from './components/Script';

export default function($) {
	const { title, content } = $;
	const { typo, typoTitle, __ } = $;
	return (
		<Page {...$} pageType="essay">
			<div class="content">
				<article class="essay essay_single">
					<header class="essay__header">
						<h2 class="entry-title">{typoTitle(title)}</h2>
					</header>

					<div class="essay__content entry-content text">{typo(content)}</div>

					<PostMeta {...$} post={$} />
				</article>
			</div>
		</Page>
	);
}
