import Page from './Page';
import PostExcerpt from './components/PostExcerpt';
import Script from './components/Script';

export default function($, children) {
	const { documents, tags, nextUrl } = $;
	const { __, option, typo, typoTitle } = $;

	return (
		<Page pageType="essay" noIndex={!!nextUrl} {...$}>
			{children}

			<div data-component="essay-excerpts">
				{documents.map(post => <PostExcerpt {...$} post={post} />)}
			</div>

			<div class="content">
				{nextUrl && (
					<div class="pagination">
						<a href={nextUrl} class="pagination__link link link_quoted">
							&darr; <u>{__('nextPage')}</u>
						</a>
					</div>
				)}
				{tags && (
					<ul class="blog-tags text content">
						{tags.map(tag => (
							<li class="blog-tags__item">
								<a href={tag.url}>{option('tagNames')[tag.id]}</a>
								<span class="blog-tags__counter">{tag.count}</span>
							</li>
						))}
					</ul>
				)}
			</div>

			<Script src="/build/main.js" />
		</Page>
	);
}
