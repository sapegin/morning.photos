import block from 'bem-cn';

const b = block('photo-grid');

export default function(props, children) {
	let size;
	if (children.length === 2) {
		size = 'pair';
	}
	else if (children.length % 3 === 0) {
		size = children.length % 2 === 0 ? 'three-even' : 'three';
	}
	return (
		<div class={b({ [size]: !!size })}>
			{children.map(photo => {
				if (photo) {
					if (photo.nodeName === 'img') {
						photo.attributes.class = b('img');
						return <div class={b('photo')}>{photo}</div>;
					}
					photo.attributes.class = b('photo');
					photo.childNodes[0].attributes.class = b('img');
					return photo;
				}
				return null;
			})}
		</div>
	);
}
