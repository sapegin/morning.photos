import { Group } from 'fledermaus/lib/components';

// TODO
// <span class="entry-tags__tag is-active"><%= name %></span><%- comma %>

export default ({
	post,
	dateToString, option,
}) => (
	<footer class="essay__meta">
		<time class="essay__pubdate entry-pubdate" datetime={post.date}>{dateToString(post.date)}</time>

		<Group glue=", " class="entry-tags" inline>
			{post.tags.map(tag => (
				<a href={`/blog/tags/${tag}`} class="entry-tags__tag link">{option('tagNames')[tag]}</a>
			))}
		</Group>
	</footer>
);
