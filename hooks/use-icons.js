import { useSelect } from '@wordpress/data';
import { store as iconStore } from '../icons/store';

function transformIcons(iconSet) {
	return iconSet.icons.map((icon) => ({ ...icon, iconSet: iconSet.name }));
}

export function useIcons(iconSet = false) {
	return useSelect(
		(select) => {
			const { getIconSet, getIconSets } = select(iconStore);

			if (iconSet) {
				const sets = getIconSet(iconSet);
				return transformIcons(sets);
			}

			const sets = getIconSets();
			return Object.values(sets).reduce(
				(icons, iconSet) => [...icons, ...transformIcons(iconSet)],
				[],
			);
		},
		[iconSet],
	);
}

export function useIcon(iconSet, name) {
	return useSelect((select) => {
		return select(iconStore).getIcon(iconSet, name);
	});
}
