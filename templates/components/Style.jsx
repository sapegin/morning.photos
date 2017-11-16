/**
 * Add a fingerprinted or inlined stylesheet.
 *
 * @param {object} props
 * @param {object} children
 * @param {string} [props.src] Stylesheet source.
 * @param {boolean} [props.inline=false] Inline styles.
 * @returns {VDO}
 */
export default function Style(props, children, { inlineFile, fingerprint }) {
	props = props || {};
	const attrs = {};
	let content;
	if (props.inline) {
		content = inlineFile(props.src);
	} else if (props.src) {
		attrs.href = fingerprint(props.src);
		attrs.rel = 'stylesheet';
	}
	const tag = content ? 'style' : 'link';
	return vdo(tag, attrs, content && vdo.markSafe(content));
}
