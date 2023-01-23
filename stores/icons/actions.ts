import { IconSet, ActionTypes } from "./types";

/**
 * Returns an action object used in signalling that new block styles have been added.
 */
export function registerIconSet(iconSet: IconSet) {
	return {
		type: ActionTypes.REGISTER_ICON_SET,
		iconSet,
	};
}

/**
 * Returns an action object used in signalling that block styles have been removed.
 */
export function removeIconSet(name: string) {
	return {
		type: ActionTypes.REMOVE_ICON_SET,
		name,
	};
}
