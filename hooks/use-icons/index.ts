import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import { useMemo } from '@wordpress/element';
import { iconStore } from '../../stores';
import { CoreIconCollectionRecord, CoreIconRecord, Icon, IconSet } from '../../stores/icons/types';
import { coreRecordsToIconSets, hasCoreIconEntity, mergeIconSets } from './core-icons';

function transformIcons(iconSet: IconSet) {
	return iconSet.icons.map((icon) => ({ ...icon, iconSet: iconSet.name }));
}

type ExtendedIcons = ReturnType<typeof transformIcons>;

// Same (empty) query core's own icon block uses, so both share one request.
const ALL_CORE_ICONS = {};

const NO_CORE_RECORDS = { icons: null, collections: null };

/**
 * Reads the core icon registry (WP 7.0+) through core-data: one list request
 * for every icon, one for the collection labels. Returns empty results when
 * `enabled` is false or the site has no `root/icon` entity, so on older
 * WordPress nothing is requested.
 *
 * @param enabled Whether core icons are needed.
 * @returns The raw core icon and collection records, null while loading.
 */
function useCoreIconRecords(enabled: boolean): {
	icons: CoreIconRecord[] | null;
	collections: CoreIconCollectionRecord[] | null;
} {
	return useSelect(
		(select) => {
			if (!enabled) {
				return NO_CORE_RECORDS;
			}

			const { getEntitiesConfig, getEntityRecords } = select(coreStore);

			if (!hasCoreIconEntity(getEntitiesConfig('root'))) {
				return NO_CORE_RECORDS;
			}

			return {
				icons: getEntityRecords('root', 'icon', ALL_CORE_ICONS) as CoreIconRecord[] | null,
				collections: getEntityRecords('root', 'iconCollection') as
					| CoreIconCollectionRecord[]
					| null,
			};
		},
		[enabled],
	);
}

/**
 * Returns the icons of every available icon set, or of `iconSet` alone. Sets
 * registered in the `tenup/icons` store come first and win over a core
 * collection of the same name; core-only collections follow.
 *
 * @param iconSet Optional set name to limit the icons to.
 * @returns Icons, each with its `iconSet`.
 */
const useIcons = (iconSet = '') => {
	const storeSets = useSelect((select) => select(iconStore).getIconSets(), []);
	const hasStoreSet = !!iconSet && storeSets.some(({ name }) => name === iconSet);
	const { icons, collections } = useCoreIconRecords(!hasStoreSet);

	return useMemo<ExtendedIcons>(() => {
		const sets = mergeIconSets(storeSets, coreRecordsToIconSets(icons, collections));
		const selected = iconSet ? sets.filter(({ name }) => name === iconSet) : sets;

		return selected.reduce<ExtendedIcons>((all, set) => [...all, ...transformIcons(set)], []);
	}, [storeSets, icons, collections, iconSet]);
};

/**
 * Returns a single icon. A set registered in the `tenup/icons` store is
 * answered from the store alone; otherwise the icon is looked up in core.
 *
 * @param iconSet Icon set name.
 * @param name    Icon name within the set.
 * @returns The icon, or undefined (or an empty array, from the store) when missing.
 */
const useIcon = (iconSet: string, name: string) => {
	const storeIcon = useSelect(
		(select) => {
			return select(iconStore).getIcon(iconSet, name);
		},
		[iconSet, name],
	);

	// `getIcon` returns undefined only when the store has no such set.
	const hasStoreSet = storeIcon !== undefined;
	const { icons } = useCoreIconRecords(!hasStoreSet && !!iconSet);

	return useMemo<Icon | never[] | undefined>(() => {
		if (hasStoreSet) {
			return storeIcon;
		}

		return coreRecordsToIconSets(icons, null)
			.find((set) => set.name === iconSet)
			?.icons.find((icon) => icon.name === name);
	}, [hasStoreSet, storeIcon, icons, iconSet, name]);
};

export { useIcons, useIcon };
