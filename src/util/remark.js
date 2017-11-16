import visit from 'unist-util-visit';
import { trim } from 'lodash';
import { safe, markdown } from 'fledermaus/lib/util';
import { slugify } from './gallery';
import Photo from '../../templates/components/Photo';

const PHOTO_PROTOCOL = 'photo://';

export function image() {
	return ast =>
		visit(ast, 'paragraph', node => {
			const child = node.children && node.children[0];
			if (child && child.type === 'image') {
				let extra = node.children.length > 1 && node.children.pop();
				node.children = null;
				node.type = 'html';
				if (child.url.startsWith(PHOTO_PROTOCOL)) {
					const name = child.url.substring(PHOTO_PROTOCOL.length);
					const slug = slugify(name);
					node.value = (
						<figure class="entry-photo">
							<Photo slug={slug} size="medium" class="entry-photo__img" />
						</figure>
					).toString();
				} else if (extra) {
					// Very basic implementation, only single class name is supported: ![](foo.jpg){.bar}
					extra = trim(extra.value, '{}');
					node.value = (
						<img src={child.url} alt={child.title} class={extra.substring(1)} />
					).toString();
				} else {
					node.value = (
						<figure class="entry-photo">
							<img src={child.url} alt={child.title} class="entry-photo__img" />
							{child.title && (
								<figcaption class="entry-photo__byline">{safe(markdown(child.title))}</figcaption>
							)}
						</figure>
					).toString();
				}
			}
		});
}
