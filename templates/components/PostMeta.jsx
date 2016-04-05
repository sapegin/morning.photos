// TODO
// <span class="entry-tags__tag is-active"><%= name %></span><%- comma %>

export default ({
	post,
	safe, dateToString, option,
}) => (
	<footer class="essay__meta">
		<time class="essay__pubdate entry-pubdate" datetime={post.date}>{dateToString(post.date)}</time>

		<span class="entry-tags">
			{safe(post.tags.map(tag => (
				<a href={`/blog/tags/${tag}`} class="entry-tags__tag link">{option('tagNames')[tag]}</a>
			)).join(', '))}
		</span>
	</footer>
);
