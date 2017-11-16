import block from 'bem-cn';

const b = block('splash');

export default ({ src, mod }) => (
	<div class={b}>
		<div class={b('img', { [mod]: !!mod })} style={`background-image:url(${src})`} />
	</div>
);
