/**
 * WordPress dependencies
 */
import { combineReducers } from '@wordpress/data';

/**
 * Reducer managing the block style variations.
 *
 * @param {object} state  Current state.
 * @param {object} action Dispatched action.
 *
 * @returns {object} Updated state.
 */
export function iconSets(state = { iconSets: {} }, action) {
	switch (action.type) {
		case 'REGISTER_ICON_SET':
			return {
				...state,
				iconSets: {
					...state.iconSets,
					[action.iconSet.name]: action.iconSet,
				},
			};
		case 'REMOVE_ICON_SET':
			// eslint-disable-next-line no-prototype-builtins
			if (state.iconSet.hasOwnProperty(action.name)) {
				const newState = { ...state };
				delete newState.iconSet[action.name];
				return newState;
			}
			return state;
		default:
			return state;
	}
}

export default combineReducers({
	iconSets,
});
