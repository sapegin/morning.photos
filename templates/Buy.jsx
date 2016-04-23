import PageWithTitle from './PageWithTitle';
import PhotoGrid from './components/PhotoGrid';
import Photo from './components/Photo';

// TODO: Replace with links to portfolio

export default function($) {
	const { content } = $;
	const { typo } = $;
	return (
		<PageWithTitle {...$}>
			<PhotoGrid>
				<a href="/travel/curonian-spit/2010-07-06-7750">
					<Photo slug="2010-07-06_7750" size="small" />
				</a>
				<a href="/travel/tallinn">
					<Photo slug="2012-08-26_2203" size="small" />
				</a>
				<a href="/travel/zubova-schel/2009-09-18-1357">
					<Photo slug="2009-09-18_1357" size="small" />
				</a>
			</PhotoGrid>

			<div class="text">{typo(content)}</div>
		</PageWithTitle>
	);
}
