import flow from 'lodash/flow';
import { markdown, markdownBlock } from 'fledermaus/lib/util';
import { Group } from 'fledermaus/lib/components';
import quotes from '../src/data/quotes';
import PageWithTitle from './PageWithTitle';
import Share from './components/Share';

export default function($) {
	const { content, pageTitle } = $;
	const { typo, Script } = $;
	return (
		<PageWithTitle {...$}>
			<div class="text">
				<div class="l-quad-space">
					{typo(content)}
				</div>

				<div class="quotes">
					{quotes.map(quote => (
						<div class="quote">
							<div class="quote__text">
								{flow(markdownBlock, typo)(quote.text)}
							</div>
							<Group glue=", " class="quote__meta">
								<Group inline>
									{quote.author && (
										quote.link ? (
											<a href={quote.link}>{quote.author}</a>
										) : (
											quote.author
										)
									)}
									{quote.author_en && (
										quote.link_en ? (
											<span>(<a href={quote.link_en}>{quote.author_en}</a>)</span>
										) : (
											<span>({quote.author_en})</span>
										)
									)}
								</Group>
								{quote.role && flow(markdown, typo)(quote.role)}
							</Group>
						</div>
					))}
				</div>

				<div class="l-triple-space">
					<Share {...$} title={pageTitle} />
				</div>
			</div>

			<Script src="/build/main.js" />
		</PageWithTitle>
	);
}
