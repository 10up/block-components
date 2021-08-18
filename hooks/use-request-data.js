/**
 * WordPress dependencies
 */
 import { useSelect, useDispatch } from '@wordpress/data';

 /**
  * Hook for retrieving data from the WordPress REST API.
  *
  * @param {string} entity The entity to retrieve. ie. postType
  * @param {string} kind   The entity kind to retrieve. ie. posts
  * @param {Object} query Optional query to pass to the request.
  * @return {Array} The data returned from the request.
  */
 export const useRequestData = (entity, kind, query) => {
     const { invalidateResolution } = useDispatch('core/data');
     const { data, isLoading } = useSelect((select) => {
         return {
             data: select('core').getEntityRecords(entity, kind, query),
             isLoading: select('core/data').isResolving('core', 'getEntityRecords', [
                 entity,
                 kind,
                 query,
             ]),
         };
     });
 
     const invalidateResolver = () => {
         invalidateResolution('core', 'getEntityRecords', [entity, kind, query]);
     };
 
     return [data, isLoading, invalidateResolver];
 };

 