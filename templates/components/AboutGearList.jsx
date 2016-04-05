import flow from 'lodash/flow';
import join from 'lodash/fp/join';
import map from 'lodash/fp/map';
import { markdown } from 'fledermaus/lib/util';

const joinList = join(', ');

export default ({ list, safe }) => (
	<div class="l-row l-quad-space">
		{list.map(column => (
			<div class="l-third">
				{column.map(items => (
					<ul class="about-list">
						{items.current &&
							<li class="about-list__item">
								{flow(joinList, markdown, safe)(items.current)}
							</li>
						}
						{items.obsolete &&
							<li class="about-list__item about-list__item_obsolete">
								{flow(map(item => `<del>${item}</del>`), joinList, safe)(items.obsolete)}
							</li>
						}
					</ul>
				))}
			</div>
		))}
	</div>
);
