import { store as coreStore } from '@wordpress/core-data';

import { CoreIconRecord, Icon } from '../../stores/icons/types';

/**
 * An icon flattened into the shape the picker consumes, tagged with the
 * icon set it belongs to.
 */
export type FlattenedIcon = Icon & { iconSet: string };

/**
 * The `select` function passed to a `useSelect` callback.
 */
type WPSelect = (store: any) => any;

/**
 * Strip the leading `<collection>/` prefix from a core icon name so it lines
 * up with the bare names used by the internal icon store.
 *
 * @param {string} name Icon name, e.g. `example/smiley`.
 * @param {string} collection Collection slug the icon belongs to.
 *
 * @returns {string} The icon name without its collection prefix.
 */
export function stripCollectionPrefix(name: string, collection: string): string {
	const prefix = `${collection}/`;
	return name.startsWith(prefix) ? name.slice(prefix.length) : name;
}

/**
 * Map a core icon record onto the flattened shape the picker consumes.
 *
 * @param {CoreIconRecord} record A record from `getEntityRecords('root','icon')`.
 *
 * @returns {FlattenedIcon} The mapped icon.
 */
export function mapCoreIconRecord(record: CoreIconRecord): FlattenedIcon {
	return {
		source: record.content,
		name: stripCollectionPrefix(record.name, record.collection),
		label: record.label,
		iconSet: record.collection,
	};
}

/**
 * Merge core icons into the internal icons, deduping by `iconSet` + `name`.
 * Internal icons win on collision, so an explicit `registerIcons` override
 * beats a core-registered icon of the same name.
 *
 * @param {FlattenedIcon[]} internalIcons Icons from the internal `registerIcons` store.
 * @param {FlattenedIcon[]} coreIcons Icons mapped from the core icon store.
 *
 * @returns {FlattenedIcon[]} The merged, deduped list.
 */
export function mergeIcons(
	internalIcons: FlattenedIcon[],
	coreIcons: FlattenedIcon[],
): FlattenedIcon[] {
	const seen = new Set(internalIcons.map((icon) => `${icon.iconSet}/${icon.name}`));
	const merged = [...internalIcons];

	coreIcons.forEach((icon) => {
		const key = `${icon.iconSet}/${icon.name}`;
		if (!seen.has(key)) {
			seen.add(key);
			merged.push(icon);
		}
	});

	return merged;
}

/**
 * Read the WordPress 7.1+ core icon store and map its records onto the
 * flattened picker shape.
 *
 * Feature-detected by entity presence: on WordPress < 7.1 the `root/icon`
 * entity is not registered, so this returns an empty array and the internal
 * `registerIcons` store remains the sole source of icons.
 *
 * @param {WPSelect} select The `select` function from a `useSelect` callback.
 * @param {string} iconSet Optionally limit the result to a single collection.
 *
 * @returns {FlattenedIcon[]} The mapped core icons.
 */
export function getCoreIcons(select: WPSelect, iconSet = ''): FlattenedIcon[] {
	// @ts-ignore-next-line - The type definitions for the core store are incomplete.
	const { getEntityConfig, getEntityRecords } = select(coreStore);

	const hasIconEntity = getEntityConfig?.('root', 'icon');
	if (!hasIconEntity) {
		return [];
	}

	const records: CoreIconRecord[] = getEntityRecords('root', 'icon') ?? [];
	const icons = records.map(mapCoreIconRecord);

	if (iconSet) {
		return icons.filter((icon) => icon.iconSet === iconSet);
	}

	return icons;
}
