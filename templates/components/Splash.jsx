import cx from 'classnames';

export default ({
	src,
	mod,
}) => (
	<div class="splash">
		<div class={cx('splash__img', mod && `splash__img_${mod}`)} style={`background-image:url(${src})`}></div>
	</div>
);
