/**
 * WordPress dependencies
 */
import { createReduxStore, register, select } from '@wordpress/data';

/**
 * Internal dependencies
 */
import reducer from './reducer';
import * as selectors from './selectors';
import * as actions from './actions';

const STORE_NAME = 'tenup/icons';

/**
 * Store definition for the icons namespace.
 *
 * @type {object}
 */
export const store = createReduxStore(STORE_NAME, {
	reducer,
	selectors,
	actions,
});

const hasStore = !!select(STORE_NAME);

if (!hasStore) {
	register(store);
}
