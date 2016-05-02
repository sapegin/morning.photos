import PageWithTitle from './PageWithTitle';
import Thumbnails from './components/Thumbnails';
import Share from './components/Share';

export default function($) {
	const { title } = $;
	const { Script, __ } = $;
	return (
		<PageWithTitle {...$} pageType="album" showDescription>
			<Thumbnails {...$} />
			<Share {...$} title={`${title} — ${__('title')}`} />
			<Script src="/build/main.js"/>
		</PageWithTitle>
	);
}
