import url from 'url';
import visit from 'unist-util-visit';
import { safe, markdown } from 'fledermaus/lib/util';
import { slugify } from './gallery';
import Photo from '../../templates/components/Photo';

export function image() {
	return ast => visit(ast, 'paragraph', node => {
		let child = node.children && node.children[0];
		if (child && child.type === 'image') {
			if (child.url.startsWith('photo://')) {
				const name = url.parse(child.url).host;
				const slug = slugify(name);
				node.children = null;
				node.type = 'html';
				node.value = (
					<figure class="entry-photo">
						<Photo slug={slug} size="medium" />
						{child.title &&
							<figcaption class="entry-photo__text">
								<span class="entry-photo__title">{safe(markdown(child.title))}</span>
							</figcaption>
						}
					</figure>
				);
			}
		}
	});
}
