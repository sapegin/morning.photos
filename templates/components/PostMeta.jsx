import { Group } from 'fledermaus/lib/components';

export default ({
	post, tag,
	dateToString, option,
}) => (
	<footer class="essay__meta">
		<time class="essay__pubdate entry-pubdate" datetime={post.date}>{dateToString(post.date)}</time>

		<Group glue=", " class="entry-tags" inline>
			{post.tags.map(name => name === tag ? (
				<span class="entry-tags__tag is-active">{option('tagNames')[name]}</span>
			) : (
				<a href={`/blog/tags/${name}`} class="entry-tags__tag link">{option('tagNames')[name]}</a>
			))}
		</Group>
	</footer>
);
