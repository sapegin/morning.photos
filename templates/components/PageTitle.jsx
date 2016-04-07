export default ({
	title, description,
	typo, typoTitle,
}) => (
	<div class="entry-header">
		<h1 class="entry-title">{typoTitle(title)}</h1>
		{description &&
			<div class="entry-excerpt">${typo(description)}</div>
		}
	</div>
);
