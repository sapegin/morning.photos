import flow from 'lodash/flow';

export default ({
	title, description,
	typo, typoTitle, safe,
}) => (
	<div class="entry-header">
		<h1 class="entry-title">{flow(typoTitle, safe)(title)}</h1>
		{description &&
			<div class="entry-excerpt">${flow(typo, safe)(description)}</div>
		}
	</div>
);
