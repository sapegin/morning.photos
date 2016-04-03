import flow from 'lodash/flow';
import map from 'lodash/map';
import Page from './Page';
import AboutTriptych from './components/AboutTriptych';
import AboutGearList from './components/AboutGearList';

export default function($) {
	const { content, links, gearAlt, gear, workplaceAlt, iphoneAlt, software, about, copyrightsLabel, copyrights } = $;
	const { safe, typo, markdown, option, Script } = $;
	const author = option('author');
	return (
		<Page {...$} pageType={['about', 'inverted-head']}>
			<div class="about-splash">
				<div class="about-splash-i">
					<div class="about-splash__img js-parallax"></div>
				</div>
			</div>

			<Script src="build/parallax.js" inline />

			<div class="about-content">
				<div class="content">
					<div class="l-row l-quad-space">
						<div class="l-two-thirds text">
							{flow(typo, safe)(content)}
						</div>
						<div class="l-third">
							{map(links, group => (
								<ul class="l-double-space">
									{map(group, link => (
										<li>
											<a href={link.link} class="link">{link.label}</a>
											{link.description && ` (${link.description})`}
										</li>
									))}
								</ul>
							))}
						</div>
					</div>

					<AboutTriptych start={1} alt={author} />

					<div class="l-double-space">
						<img src="/images/about/equipment.jpg" alt={gearAlt} width="1024" height="492" />
					</div>

					<AboutGearList list={gear} {...$} />

					<AboutTriptych start={4} alt={author} />

					<div class="l-row l-double-space">
						<div class="l-two-thirds">
							<img src="/images/about/workplace.jpg" alt={workplaceAlt} width="676" height="328" />
						</div>
						<div class="l-third about-iphone">
							<img src="/images/about/iphone.jpg" alt={iphoneAlt} width="328" height="328" />
						</div>
					</div>

					<AboutGearList list={software} {...$} />

					<div class="note">
						{flow(markdown, typo, safe)(about)}
					</div>

					<div class="note">
						{copyrightsLabel}:
						{' '}
						{safe(copyrights.map(item => `<a href="${item.link}">${item.label}</a>`).join(', '))}.
					</div>
				</div>
			</div>

			<Script src="build/about.js" inline />
		</Page>
	);
}
