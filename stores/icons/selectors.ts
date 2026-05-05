/* eslint-disable no-prototype-builtins */
import { IconSet } from './types';

type IconStoreState = {
	iconSets: { [key: string]: IconSet };
};

/**
 * Returns all icons sets
 *
 * @param {object} state Data state.
 *
 * @returns {Array?} Icon Sets.
 */
export function getIconSets(state: IconStoreState) {
	const { iconSets } = state;
	return Object.values(iconSets);
}

/**
 * Returns an Icon Set by its name
 *
 * @param {object} state Data state.
 * @param {string} name Name of the Icon Set.
 *
 * @returns {object?} Icon Set.
 */
export function getIconSet(state: IconStoreState, name: string) {
	const { iconSets } = state;
	const iconSet = iconSets[name] ?? [];
	return iconSet;
}

/**
 * Returns an icon of an icon set by its name
 *
 * @param {object} state Data state.
 * @param {string} name Name of the Icon Set.
 *
 * @returns {Array?} List of Icons.
 */
export function getIcons(state: IconStoreState, name: string) {
	const { iconSets } = state;
	return iconSets?.hasOwnProperty(name) ? iconSets[name]?.icons ?? [] : [];
}

/**
 * Returns an icon of an icon set by its name
 *
 * @param {object} state Data state.
 * @param {string} name Name of the Icon Set.
 * @param {string} iconName Name of the iconName.
 *
 * @returns {object?} Icon.
 */
export function getIcon(state: IconStoreState, name: string, iconName: string) {
	const { iconSets } = state;
	return iconSets?.hasOwnProperty(name)
		? iconSets[name]?.icons?.find((item) => item.name === iconName) ?? []
		: undefined;
}
