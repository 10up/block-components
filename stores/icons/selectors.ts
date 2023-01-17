/* eslint-disable no-prototype-builtins */

export type Icon = {
	name: string;
	source: string;
	iconSet: string;
	label: string;
};

export type IconSet = {
	name: string;
	icons: Icon[];
};

/**
 * Returns all icons sets
 *
 * @param {object} state Data state.
 *
 * @returns {Array?} Icon Sets.
 */
export function getIconSets(state): IconSet[] {
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
export function getIconSet(state, name): IconSet {
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
export function getIcons(state, name): Icon[] {
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
export function getIcon(state, name, iconName): Icon | undefined {
	const { iconSets } = state;
	return iconSets?.hasOwnProperty(name)
		? iconSets[name]?.icons?.find((item) => item.name === iconName) ?? []
		: undefined;
}
