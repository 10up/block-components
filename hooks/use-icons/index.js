import { useSelect } from '@wordpress/data';
import { useState, useEffect } from '@wordpress/element';
import { iconStore } from '../../stores';

function transformIcons(iconSet) {
	return iconSet.icons.map((icon) => ({ ...icon, iconSet: iconSet.name }));
}

const useIcons = (iconSet = false) => {
	const [icons, setIcons] = useState([]);
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
			setIcons(transformIcons(rawIcons));
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

const useIcon = (iconSet, name) => {
	const [icon, setIcon] = useState(null);
	const rawIcon = useSelect(
		(select) => {
			return select(iconStore).getIcon(iconSet, name);
		},
		[iconSet, name],
	);

	useEffect(() => {
		setIcon(rawIcon);
	}, [rawIcon]);

	return icon;
};

export { useIcons, useIcon };
