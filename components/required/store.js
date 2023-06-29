import { createReduxStore, register } from '@wordpress/data';

const DEFAULT_STATE = {
	fields: {},
};

export const store = createReduxStore( 'required-fields-store', {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'SET_FIELD_REQUIRED_STATUS':
				return {
					...state,
					fields: {
						...state.fields,
						[ action.componentId ]: action.status
					}
				};
		}

		return state;
	},
	actions: {
		setIsFilled( componentId, status ) {
			return {
				type: 'SET_FIELD_REQUIRED_STATUS',
				componentId,
				status,
			};
		},
	},
	selectors: {
		shouldLock( state ) {
			return Object.keys( state.fields ).filter( field => ! state.fields[ field ] ).length > 0;
		}
	},
} );

register( store );
