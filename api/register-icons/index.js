import { dispatch } from '@wordpress/data';

import { iconStore } from '../../stores';

export function registerIcons(options) {
	dispatch(iconStore).registerIconSet(options);
}
