import block from 'bem-cn';
import PostMeta from './PostMeta';

const essay = block('essay');
const entryTitle = block('entry-title');

export default function($, children) {
	const { title, content, excerpt, tags, url, more } = $.post;
	const { safe, typo, typoTitle, __ } = $;
	let text = excerpt || content;

	// Move first photo in photo post before title
	const isPhoto = tags.includes('photos');
	let firstPhoto;
	if (isPhoto) {
		firstPhoto = text.match(/<figure class="entry-photo">[\S\s]*?<\/figure>/);
		if (firstPhoto) {
			text = text.replace(firstPhoto, '');
		}
	}

	return (
		<article class={essay({ photo: isPhoto })}>
			<div class="content">
				<header>
					<h2 class={entryTitle({ 'excerpt': !isPhoto, 'excerpt-photo': isPhoto })}>
						<a class={entryTitle('link')} href={url}>
							{isPhoto && firstPhoto &&
								<div class={essay('featured')}>{safe(firstPhoto)}</div>
							}
							{typoTitle(title)}
						</a>
					</h2>
				</header>

				<div class={essay('content').mix('text')}>
					{typo(text)}
					{more &&
						<u-cut>
							<p class="more-link">
								<a class="more-link__link js-more-link" href={url}>{__('readMore')}</a>
							</p>
							<div class="js-more-content is-hidden">{typo(more)}</div>
						</u-cut>
					}
				</div>

				<PostMeta {...$} />
			</div>
		</article>
	);
}
