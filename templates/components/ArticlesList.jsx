import cx from 'classnames';

export default ({ list, cols, markImportant, typo }) => (
	<ul class={cx('articles-list', { 'articles-list_cols': cols })}>
		{list.map(link => (
			<li class={cx('articles-list__item', { 'articles-list__item_important': link.important && markImportant })}>
				<a href={link.link} class="link">
					{typo(link.label)}
				</a>
				{link.description &&
					<div class="articles-list__description">{typo(link.description)}</div>
				}
			</li>
		))}
	</ul>
);
