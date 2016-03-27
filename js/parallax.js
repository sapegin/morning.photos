import hasTouch from 'has-touch';

const SPEED = 0.41;

if (!hasTouch) {
	const elem = document.querySelector('.js-parallax');

	window.addEventListener('scroll', () => {
		const pageY = window.pageYOffset;
		if (pageY < screen.height) {
			const offset = -pageY * SPEED;
			elem.style.transform = `translateY(${offset}px)`;
		}
	});
}
