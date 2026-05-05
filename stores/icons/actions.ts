import { IconSet } from './types';

/**
 * Returns an action object used in signalling that new block styles have been added.
 *
 * @param {object} iconSet icon set.
 *
 * @returns {object} Action object.
 */
export function registerIconSet(iconSet: IconSet) {
	return {
		type: 'REGISTER_ICON_SET',
		iconSet,
	} as const;
}

/**
 * Returns an action object used in signalling that block styles have been removed.
 *
 * @param {string} name  Icon Set name.
 *
 * @returns {object} Action object.
 */
export function removeIconSet(name: string) {
	return {
		type: 'REMOVE_ICON_SET',
		name,
	} as const;
}

export type IconSetAction = ReturnType<typeof registerIconSet> | ReturnType<typeof removeIconSet>;
