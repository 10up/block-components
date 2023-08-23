import { useState, useEffect, useCallback, useMemo } from '@wordpress/element';
import uFuzzy from '@leeoniya/ufuzzy';

// eslint-disable-next-line new-cap
const fuzzy = new uFuzzy();

interface ObjectWithDynamicPropertyArray {
	[key: string]: any[];
}

export function useFilteredList<T>(list: T[] = [], searchTerm: string = '', property: string = 'name') {
	const [filteredList, setFilteredList] = useState<T[]>(list);

	const propertyList = useMemo(() => list.map((item) => item[property]), [list, property]);

	const filterList = useCallback(
		(searchTerm) => {
			const matchedNames = fuzzy.filter(propertyList, searchTerm);
			return matchedNames.map((index) => list[index]);
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
