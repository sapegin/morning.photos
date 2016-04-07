import Base from './Base';
import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';

export default function($, children) {
	const { content, url } = $;
	const { typo, option, __ } = $;
	return (
		<Base {...$}>
			<PageHeader menu={option('menu')} title={__('title')} url={url} />
			{children || typo(content)}
			<PageFooter author={option('author')} />
		</Base>
	);
}
