import { useSelect } from '@wordpress/data';
import { iconStore } from '../../stores';
import { IconSet } from '../../stores/icons/types';
import { getCoreIcons, mergeIcons, FlattenedIcon } from './map-core-icons';

function transformIcons(iconSet: IconSet): FlattenedIcon[] {
	return iconSet.icons.map((icon) => ({ ...icon, iconSet: iconSet.name }));
}

const useIcons = (iconSet = '') => {
	return useSelect(
		(select) => {
			const { getIconSet, getIconSets } = select(iconStore);

			let internalIcons: FlattenedIcon[];
			if (iconSet) {
				const rawIconSet = getIconSet(iconSet);
				// `getIconSet` returns an empty array when the set is unknown to the
				// internal store, e.g. a collection registered only in the core store.
				internalIcons = Array.isArray(rawIconSet) ? [] : transformIcons(rawIconSet);
			} else {
				internalIcons = getIconSets().reduce<FlattenedIcon[]>(
					(icons, set) => [...icons, ...transformIcons(set)],
					[],
				);
			}

			const coreIcons = getCoreIcons(select, iconSet);

			return mergeIcons(internalIcons, coreIcons);
		},
		[iconSet],
	);
};

const useIcon = (iconSet: string, name: string) => {
	return useSelect(
		(select) => {
			const internalIcon = select(iconStore).getIcon(iconSet, name);

			const isInternalMatch = !!internalIcon && !Array.isArray(internalIcon);
			if (isInternalMatch) {
				return internalIcon;
			}

			const coreIcons = getCoreIcons(select, iconSet);
			const coreIcon = coreIcons.find((icon) => icon.name === name);

			return coreIcon ?? internalIcon;
		},
		[iconSet, name],
	);
};

export { useIcons, useIcon };
