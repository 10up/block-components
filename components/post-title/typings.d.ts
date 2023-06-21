declare module '@wordpress/core-data' {
	function useEntityProp< T = unknown, T2 = unknown >(
		kind: string,
		name: string,
		prop: string,
		id?: string
	): [ T, ( value: T ) => void, T2 ];
}