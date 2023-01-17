/**
 * External dependencies
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import isObject from 'lodash/isObject';

/**
 * WordPress dependencies
 */
// @ts-ignore
import { useSelect, useDispatch, store as coreDataStore } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

/**
 * Hook for retrieving data from the WordPress REST API.
 *
 * @param {string} entity           The entity to retrieve. ie. postType
 * @param {string} kind             The entity kind to retrieve. ie. posts
 * @param {object | number} [query] Optional. Query to pass to the geEntityRecords request. Defaults to an empty object. If a number is passed, it is used as the ID of the entity to retrieve via getEntityRecord.
 * @returns {Array} The data returned from the request.
 */
export const useRequestData = (entity: string, kind: string, query: any = {}) => {
	const functionToCall = isObject(query) ? 'getEntityRecords' : 'getEntityRecord';
	const { invalidateResolution } = useDispatch(coreDataStore);
	const { data, isLoading } = useSelect(
		(select) => {
			const { getEntityRecords, getEntityRecord } = select(coreStore);

			const selector = isObject(query) ? getEntityRecords : getEntityRecord;

			return {
				data: selector(entity, kind, query),
				// @ts-ignore
				isLoading: select(coreDataStore).isResolving(coreStore, functionToCall, [
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
