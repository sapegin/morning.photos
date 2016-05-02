import Page from './Page';
import PostMeta from './components/PostMeta';
import Subscribe from './components/Subscribe';
import Share from './components/Share';

export default function($) {
	const { title, content } = $;
	const { typo, typoTitle, Script } = $;
	return (
		<Page {...$} pageType="essay">
			<div class="content">
				<article class="essay essay_single entry">
					<header class="essay__header">
						<h2 class="entry-title">
							{typoTitle(title)}
						</h2>
					</header>

					<div class="essay__content text">
						{typo(content)}
					</div>

					<PostMeta {...$} post={$} />
					<Share {...$} title={title} />
				</article>

				<Subscribe {...$} from="Blog" />
			</div>

			<Script src="/build/main.js"/>
		</Page>
	);
}
