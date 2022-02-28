import { useState, useEffect, useCallback } from '@wordpress/element';

/**
 * useFilteredList
 *
 * @param {Array} list list of items to filter
 * @param {string} searchTerm search term string
 * @param {string?} property name of the prop
 * @returns {Array} filtered list
 */
export function useFilteredList(list = [], searchTerm = '', property = 'name') {
	const [filteredList, setFilteredList] = useState(list);

	const filterList = useCallback(
		(searchTerm) => {
			return list.filter((item) => item[property].includes(searchTerm));
		},
		[list, property],
	);

	useEffect(() => {
		const hasListItems = !!list?.length;
		const hasSearchTerm = searchTerm !== '';
		const canFilter = hasSearchTerm && hasListItems;
		const newFilteredList = canFilter ? filterList(searchTerm) : list;
		setFilteredList(newFilteredList);
	}, [searchTerm, filterList, list]);

	return [filteredList];
}
