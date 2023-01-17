import { useState, useEffect, useCallback } from '@wordpress/element';

interface ObjectWithDynamicPropertyArray {
	[key: string]: any[];
}

export function useFilteredList<T>(list: T[] = [], searchTerm: string = '', property: string = 'name') {
	const [filteredList, setFilteredList] = useState<T[]>(list);

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
