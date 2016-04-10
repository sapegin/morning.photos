import PageWithTitle from './PageWithTitle';
import Thumbnails from './components/Thumbnails';

export default ($) => (
	<PageWithTitle {...$} pageType="album" showDescription>
		<Thumbnails {...$} />
	</PageWithTitle>
);
