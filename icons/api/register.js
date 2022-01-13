import { dispatch } from '@wordpress/data';

import { store as iconStore } from '../store/index';

export function registerIcons(options) {
	dispatch(iconStore).registerIconSet(options);
}
