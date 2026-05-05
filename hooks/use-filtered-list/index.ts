import { useState, useEffect, useCallback, useMemo } from '@wordpress/element';
import uFuzzy from '@leeoniya/ufuzzy';

// eslint-disable-next-line new-cap
const fuzzy = new uFuzzy();

/**
 * useFilteredList
 *
 * @param {Array} list list of items to filter
 * @param {string} searchTerm search term string
 * @param {string?} property name of the prop
 * @returns {Array} filtered list
 */
export function useFilteredList<TListItem extends { [key: string]: string }>(
	list: TListItem[] = [],
	searchTerm = '',
	property: keyof TListItem = 'name',
) {
	const [filteredList, setFilteredList] = useState(list);

	const propertyList = useMemo(() => list.map((item) => item[property]), [list, property]);

	const filterList = useCallback(
		(searchTerm: string) => {
			const matchedNames = fuzzy.filter(propertyList, searchTerm);
			const results = matchedNames?.map((index) => list[index]) || [];
			return results;
		},
		[propertyList, list],
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
