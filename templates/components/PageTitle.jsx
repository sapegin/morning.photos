export default ({
	title, description, showDescription,
	typo, typoTitle,
}) => (
	<div class="entry-header">
		<h1 class="entry-title">{typoTitle(title)}</h1>
		{showDescription && description &&
			<div class="entry-excerpt">{typo(description)}</div>
		}
	</div>
);
