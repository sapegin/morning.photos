import { useEffect } from 'react';

export default function useKeyPress(targetKey, fn) {
	function handler({ key }) {
		if (key === targetKey) {
			fn();
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', handler);
		return () => {
			window.removeEventListener('keydown', handler);
		};
	}, []);
}
