import Page from './Page';
import PostMeta from './components/PostMeta';
import Subscribe from './components/Subscribe';
import Share from './components/Share';
import Comments from './components/Comments';

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

				<div class="l-quad-space">
					<Subscribe {...$} from="Blog" />
				</div>

				<Comments {...$} />
			</div>

			<Script src="/build/main.js"/>
		</Page>
	);
}
