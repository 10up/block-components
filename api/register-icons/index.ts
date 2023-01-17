import { dispatch } from '@wordpress/data';
import domReady from '@wordpress/dom-ready';

import { iconStore } from '../../stores';

export function registerIcons(options) {
	domReady(() => {
		dispatch(iconStore).registerIconSet(options);
	});
}
