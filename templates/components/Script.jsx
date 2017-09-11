/**
 * Add a fingerprinted or inlined script.
 *
 * @param {object} props
 * @param {string} [props.src] Script source.
 * @param {boolean} [props.inline=false] Inline script.
 * @returns {VDO}
 */
export default function Script(props, children, { inlineFile, fingerprint }) {
	props = props || {};
	const attrs = {};
	let content;
	if (props.inline) {
		content = inlineFile(props.src);
	}
	else if (props.src) {
		attrs.src = fingerprint(props.src);
	}
	return vdo('script', attrs, content && vdo.markSafe(content));
}
