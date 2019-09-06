import { useState } from 'react';

/* eslint-disable */

const THRESHOLD = 200;

export default function useSwipe(events: { left: () => void; right: () => void }) {
	let initialX = 0;
	let lastX = 0;

	const [delta, setDelta] = useState(0);

	function handleTouchStart(event: TouchEvent) {
		/*window.addEventListener('touchmove', handleTouchMove);
		window.addEventListener('touchend', handleTouchEnd);
		window.addEventListener('touchcancel', handleTouchEnd);*/

		initialX = event.touches[0].pageX;
	}

	function handleTouchMove(event: TouchEvent) {
		lastX = event.touches[0].pageX - initialX;
		setDelta(lastX);
	}

	function handleTouchEnd() {
		/*window.removeEventListener('touchmove', handleTouchMove);
		window.removeEventListener('touchend', handleTouchEnd);
		window.removeEventListener('touchcancel', handleTouchEnd);*/

		if (lastX < THRESHOLD) {
			events.left();
		} else if (lastX > THRESHOLD) {
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
