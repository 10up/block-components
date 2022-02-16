import { useSelect } from '@wordpress/data';
import { store as iconStore } from '../icons/store';

function transformIcons(iconSet) {
	return iconSet.icons.map((icon) => ({ ...icon, iconSet: iconSet.name }));
}

export function useIcons(iconSet = false) {
	const icons = useSelect(
		(select) => {
			const { getIconSet, getIconSets } = select(iconStore);

			if (iconSet) {
				return getIconSet(iconSet);
			}

			return getIconSets();
		},
		[iconSet],
	);

	if (iconSet) {
		return transformIcons(icons);
	}

	return Object.values(icons).reduce(
		(icons, iconSet) => [...icons, ...transformIcons(iconSet)],
		[],
	);
}

export function useIcon(iconSet, name) {
	return useSelect((select) => {
		return select(iconStore).getIcon(iconSet, name);
	});
}
