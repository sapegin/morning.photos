import url from 'url';
import visit from 'unist-util-visit';
import { trim } from 'lodash';
import { safe, markdown } from 'fledermaus/lib/util';
import { slugify } from './gallery';
import Photo from '../../templates/components/Photo';

export function image() {
	return ast => visit(ast, 'paragraph', node => {
		let child = node.children && node.children[0];
		if (child && child.type === 'image') {
			let extra = node.children.length > 1 && node.children.pop();
			node.children = null;
			node.type = 'html';
			if (child.url.startsWith('photo://')) {
				const name = url.parse(child.url).host;
				const slug = slugify(name);
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
			else if (extra) {
				// Very basic implementation, only single class name is supported: ![](foo.jpg){.bar}
				extra = trim(extra.value, '{}');
				node.value = (
					<img src={child.url} alt={child.title} class={extra.substring(1)} />
				);
			}
			else {
				node.value = (
					<figure class="entry-photo">
						<img src={child.url} alt={child.title} />
					</figure>
				);
			}
		}
	});
}
