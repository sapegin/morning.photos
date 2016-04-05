import Posts from './Posts';
import PageTitle from './components/PageTitle';

export default function($) {
	const { title, tag, total } = $;
	const { __, option } = $;
	const tagName = option('tagNames')[tag];
	return (
		<Posts {...$} title={tagName} noIndex>
			<div class="content">
				<PageTitle {...$} title={__('tags.title', { tag: tagName, total })} />
			</div>
		</Posts>
	);
}
