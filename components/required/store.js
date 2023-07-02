import { createReduxStore, register } from '@wordpress/data';

const DEFAULT_STATE = {
};

export const store = createReduxStore( 'required-fields-store', {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'APPEND_COMPONENT_ID_TO_BLOCK':
				if ( state[ action.clientId ] ) {
					return {
						...state,
						[ action.clientId ]: [
							...state[ action.clientId ],
							action.componentId
						]
					}
				}

				return {
					...state,
					[ action.clientId ] : [ action.componentId]
				};

			case 'REMOVE_COMPONENT_ID_TO_BLOCK':
				if ( state[ action.clientId ] ) {
					return {
						...state,
						[ action.clientId ]: state[action.clientId].filter( componentId => componentId !== action.componentId )
					}
				}

				return state
		}

		return state;
	},
	actions: {
		appendComponentId( clientId, componentId ) {
			return {
				type: 'APPEND_COMPONENT_ID_TO_BLOCK',
				clientId,
				componentId,
			};
		},
		removeComponentId( clientId, componentId ) {
			return {
				type: 'REMOVE_COMPONENT_ID_TO_BLOCK',
				clientId,
				componentId,
			};
		}
	},
	selectors: {
		blockHasErrors( state, clientId ) {
			return state[ clientId ] ? state[ clientId ].length > 0 : false;
		}
	},
} );

register( store );
