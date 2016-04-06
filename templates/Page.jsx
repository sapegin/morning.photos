import flow from 'lodash/flow';
import Base from './Base';
import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';

export default function($, children) {
	const { content, url } = $;
	const { safe, typo, option, __ } = $;
	return (
		<Base {...$}>
			<PageHeader menu={option('menu')} title={__('title')} url={url} />
			{children || flow(typo, safe)(content)}
			<PageFooter author={option('author')} />
		</Base>
	);
}
