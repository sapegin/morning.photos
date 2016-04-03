// <span class="entry-tags__tag is-active"><%= name %></span><%- comma %>

export default ({
	date, tags,
	safe, dateToString, option,
}) => (
	<footer class="essay__meta">
		<time class="essay__pubdate entry-pubdate" datetime={date}>{dateToString(date)}</time>

		<span class="entry-tags">
			{safe(tags.map(tag => (
				<a href={`/blog/tags/${tag}`} class="entry-tags__tag link">{option('tagNames')[tag]}</a>
			)).join(', '))}
		</span>
	</footer>
);
