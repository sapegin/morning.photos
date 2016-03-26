/**
 * Convert array like object to array.
 *
 * @param {Object} list Array like object.
 * @returns {Array}
 */
export function toArray(list) {
	return Array.prototype.slice.call(list);
}
