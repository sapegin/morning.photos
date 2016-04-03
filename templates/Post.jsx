import flow from 'lodash/flow';
import Page from './Page';
import PostMeta from './components/PostMeta';
import Subscribe from './components/Subscribe';

export default function($) {
	const { title, content } = $;
	const { safe, typo, typoTitle } = $;
	return (
		<Page {...$} pageType="essay">
			<div class="content">
				<article class="essay essay_single entry">
					<header class="essay__header">
						<h2 class="entry-title">
							{flow(typoTitle, safe)(title)}
						</h2>
					</header>

					<div class="essay__content text">
						{flow(typo, safe)(content)}
					</div>

					<PostMeta {...$} />
				</article>

				<Subscribe {...$} from="Blog" />
			</div>
		</Page>
	);
}
