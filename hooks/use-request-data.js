/**
 * External dependencies
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import isObject from 'lodash/isObject';

/**
 * WordPress dependencies
 */
 import { useSelect, useDispatch } from '@wordpress/data';

 /**
 * Hook for retrieving data from the WordPress REST API.
 *
 * @param {string} entity           The entity to retrieve. ie. postType
 * @param {string} kind             The entity kind to retrieve. ie. posts
 * @param {Object | number} [query] Optional. Query to pass to the geEntityRecords request. Defaults to an empty object. If a number is passed, it is used as the ID of the entity to retrieve via getEntityRecord.
 * @return {Array} The data returned from the request.
 */
 export const useRequestData = (entity, kind, query = {}) => {
    const functionToCall = isObject(query) ? 'getEntityRecords' : 'getEntityRecord';
	const { invalidateResolution } = useDispatch('core/data');
	const { data, isLoading } = useSelect((select) => {
		return {
			data: select('core')[functionToCall](entity, kind, query),
			isLoading: select('core/data').isResolving('core', functionToCall, [
				entity,
				kind,
				query,
			]),
		};
	});

	const invalidateResolver = () => {
		invalidateResolution('core', functionToCall, [entity, kind, query]);
	};
 
     return [data, isLoading, invalidateResolver];
 };

 