/**
 * Returns an action object used in signalling that new block styles have been added.
 *
 * @param {object} iconSet icon set.
 *
 * @returns {object} Action object.
 */
export function registerIconSet(iconSet) {
	return {
		type: 'REGISTER_ICON_SET',
		iconSet,
	};
}

/**
 * Returns an action object used in signalling that block styles have been removed.
 *
 * @param {string} name  Icon Set name.
 *
 * @returns {object} Action object.
 */
export function removeIconSet(name) {
	return {
		type: 'REMOVE_ICON_SET',
		name,
	};
}
