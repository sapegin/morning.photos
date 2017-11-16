import Group from './Group';

export default ({ post, tag, dateToString, option }) => (
	<footer class="essay__meta">
		<time class="essay__pubdate entry-pubdate" datetime={post.date}>
			{dateToString(post.date)}
		</time>

		<Group glue=", " class="entry-tags" inline>
			{post.tags.map(
				id =>
					id === tag ? (
						<span class="entry-tags__tag is-active">{option('tagNames')[id]}</span>
					) : (
						<a href={`/blog/tags/${id}`} class="entry-tags__tag link">
							{option('tagNames')[id]}
						</a>
					)
			)}
		</Group>
	</footer>
);
