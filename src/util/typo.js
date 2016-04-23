import richtypo from 'richtypo';

function prepare(text = '') {
	return text
		.replace(/(\w)'/g, '$1’')
		.replace(/'(\w)/g, '’$1')
	;
}

/**
 * Rich typo for EXIF text.
 *
 * @param {string} text
 * @param {string} lang
 * @returns  {string}
 */
export function typo(text, lang) {
	text = prepare(text);
	text = richtypo.full(text, lang);
	return text;
}

/**
 * Rich typo for EXIF text titles.
 *
 * @param {string} text
 * @param {string} lang
 * @returns  {string}
 */
export function typoTitle(text, lang) {
	text = prepare(text);
	text = richtypo.lite(text, lang);
	text = richtypo.title(text, lang);
	return text;
}
