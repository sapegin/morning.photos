export default ($) => (
	<div class="l-row l-quad-space">
		{$.list.map(column => (
			<div class="l-third">
				{column.map(items => (
					<ul class="about-list">
						{items.current &&
							<li class="about-list__item">
								{$.safe($.markdown(items.current.join(', ')))}
							</li>
						}
						{items.obsolete &&
							<li class="about-list__item about-list__item_obsolete">
								{$.safe(items.obsolete.map(item => `<del>${item}</del>`).join(', '))}
							</li>
						}
					</ul>
				))}
			</div>
		))}
	</div>
);
