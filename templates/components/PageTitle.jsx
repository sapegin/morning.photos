import flow from 'lodash/flow';
import { markdown } from 'fledermaus/lib/util';

export default ({
	title, description, showDescription,
	typo, typoTitle,
}) => (
	<div class="entry-header">
		<h1 class="entry-title">{typoTitle(title)}</h1>
		{showDescription && description &&
			<div class="entry-excerpt">{flow(markdown, typo)(description)}</div>
		}
	</div>
);
