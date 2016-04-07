import flow from 'lodash/flow';
import map from 'lodash/map';
import { markdown } from 'fledermaus/lib/util';
import { Group } from 'fledermaus/lib/components';
import Page from './Page';
import PhotoGrid from './components/PhotoGrid';
import AboutTriptych from './components/AboutTriptych';
import AboutGearList from './components/AboutGearList';

export default function($) {
	const { content, links, gearAlt, gear, workplaceAlt, iphoneAlt, software, about, copyrightsLabel, copyrights } = $;
	const { typo, option, Script } = $;
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
							{typo(content)}
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

					<PhotoGrid>
						<img src="/images/about/equipment.jpg" alt={gearAlt} width="1024" height="492" />
					</PhotoGrid>

					<AboutGearList list={gear} {...$} />

					<AboutTriptych start={4} alt={author} />

					<div class="photo-grid">
						<div class="photo-grid__photo photo-grid__photo_two-thirds">
							<img src="/images/about/workplace.jpg" alt={workplaceAlt} width="676" height="328"
								class="photo-grid__img" />
						</div>
						<div class="photo-grid__photo photo-grid__photo_third">
							<img src="/images/about/iphone.jpg" alt={iphoneAlt} width="328" height="328"
								class="photo-grid__img" />
						</div>
					</div>

					<AboutGearList list={software} {...$} />

					<div class="note">
						{flow(markdown, typo)(about)}
					</div>

					<Group class="note">
						{copyrightsLabel}
						<Group glue=", " inline>
							{copyrights.map(item => <a href={item.link}>{item.label}</a>)}
						</Group>
					</Group>
				</div>
			</div>

			<Script src="build/about.js" inline />
		</Page>
	);
}
