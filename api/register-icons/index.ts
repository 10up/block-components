import { dispatch } from '@wordpress/data';
import domReady from '@wordpress/dom-ready';

import { iconStore } from '../../stores';
import type { IconSet } from '../../stores/icons/types';

export function registerIcons(options: IconSet) {
	domReady(() => {
		dispatch(iconStore).registerIconSet(options);
	});
}
