import { useState } from 'react';

/* eslint-disable */

const TRESHOLD = 200;

export default function useSwipe(events) {
	let initialX = 0;
	let lastX = 0;

	const [delta, setDelta] = useState(0);

	function handleTouchStart(e) {
		/*window.addEventListener('touchmove', handleTouchMove);
		window.addEventListener('touchend', handleTouchEnd);
		window.addEventListener('touchcancel', handleTouchEnd);*/

		initialX = e.touches[0].pageX;
	}

	function handleTouchMove(e) {
		lastX = e.touches[0].pageX - initialX;
		setDelta(lastX);
	}

	function handleTouchEnd() {
		/*window.removeEventListener('touchmove', handleTouchMove);
		window.removeEventListener('touchend', handleTouchEnd);
		window.removeEventListener('touchcancel', handleTouchEnd);*/

		if (lastX < TRESHOLD) {
			events.left();
		} else if (lastX > TRESHOLD) {
			events.right();
		}

		setDelta(0);
	}

	return {
		delta,
		props: {
			onTouchStart: handleTouchStart,
		},
	};
}
