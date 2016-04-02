import Base from './Base';
import PageHeader from './components/PageHeader';
import PageFooter from './components/PageFooter';

export default function($, children) {
	return (
		<Base {...$}>
			<PageHeader menu={$.option('menu')} title={$.option('title')} url={$.url} />
			{children || $.typo($.content)}
			<PageFooter author={$.option('author')} />
		</Base>
	);
}
