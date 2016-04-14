export default ({ list, typo }) => (
	<ul class="articles-list">
		{list.map(link => (
			<li class="articles-list__item">
				<a href={link.link} class="link">{typo(link.label)}</a>
				{link.description &&
					<div class="articles-list__description">{typo(link.description)}</div>
				}
			</li>
		))}
	</ul>
);
