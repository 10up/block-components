/**
 * External dependencies
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import isObject from 'lodash/isObject';

/**
 * WordPress dependencies
 */
import { store as coreStore } from '@wordpress/core-data';
// @ts-ignore-next-line - The type definitions for the data package are incomplete.
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Hook for retrieving data from the WordPress REST API.
 *
 * @param {string} entity           The entity to retrieve. ie. postType
 * @param {string} kind             The entity kind to retrieve. ie. posts
 * @param {object | number} [query] Optional. Query to pass to the geEntityRecords request. Defaults to an empty object. If a number is passed, it is used as the ID of the entity to retrieve via getEntityRecord.
 * @returns {Array} The data returned from the request.
 */
export const useRequestData = (entity: string, kind: string, query: Record<string, any> = {}) => {
	const functionToCall = isObject(query) ? 'getEntityRecords' : 'getEntityRecord';
	const { invalidateResolution } = useDispatch('core/data');
	const { data, isLoading } = useSelect(
		(select) => {
			return {
				// @ts-ignore-next-line - The type definitions for the data package are incomplete.
				data: select(coreStore)[functionToCall](entity, kind, query),
				// @ts-ignore-next-line - The type definitions for the data package are incomplete.
				isLoading: select('core/data').isResolving(coreStore, functionToCall, [
					entity,
					kind,
					query,
				]),
			};
		},
		[entity, kind, query],
	);

	const invalidateResolver = () => {
		invalidateResolution(coreStore, functionToCall, [entity, kind, query]);
	};

	return [data, isLoading, invalidateResolver];
};
