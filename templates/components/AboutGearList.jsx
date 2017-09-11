import flow from 'lodash/flow';
import { markdown } from 'fledermaus/lib/util';
import Group from './Group';

export default ({ list, typo }) => (
	<div class="l-row l-quad-space">
		{list.map(column => (
			<div class="l-third">
				{column.map(items => (
					<ul class="about-list text">
						{items.current &&
							<li class="about-list__item">
								<Group glue=", ">
									{items.current.map(flow(markdown, typo))}
								</Group>
							</li>
						}
						{items.obsolete &&
							<li class="about-list__item about-list__item_obsolete">
								<Group glue=", ">
									{items.obsolete.map(item => <del>{flow(markdown, typo)(item)}</del>)}
								</Group>
							</li>
						}
					</ul>
				))}
			</div>
		))}
	</div>
);
