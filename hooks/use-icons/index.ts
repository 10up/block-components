import { useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { iconStore } from '../../stores';
import { IconSet } from '../../stores/icons/types';

function transformIcons(iconSet: IconSet) {
	return iconSet.icons.map((icon) => ({ ...icon, iconSet: iconSet.name }));
}

type ExtendedIcons = ReturnType<typeof transformIcons>;

const useIcons = (iconSet = '') => {
	const [icons, setIcons] = useState<ExtendedIcons>([]);
	const rawIcons = useSelect(
		(select) => {
			const { getIconSet, getIconSets } = select(iconStore);

			if (iconSet) {
				return getIconSet(iconSet);
			}

			return getIconSets();
		},
		[iconSet],
	);

	useEffect(() => {
		if (iconSet) {
			setIcons(transformIcons(rawIcons as IconSet));
		}

		setIcons(
			Object.values(rawIcons).reduce(
				(rawIcons, iconSet) => [...rawIcons, ...transformIcons(iconSet)],
				[],
			),
		);
	}, [rawIcons, iconSet]);

	return icons;
};

const useIcon = (iconSet: string, name: string) => {
	return useSelect(
		(select) => {
			return select(iconStore).getIcon(iconSet, name);
		},
		[iconSet, name],
	);
};

export { useIcons, useIcon };
