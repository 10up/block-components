/* eslint-disable no-case-declarations */
import type { WP_REST_API_User, WP_REST_API_Search_Result } from 'wp-types';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { applyFilters } from '@wordpress/hooks';
import type { ContentSearchMode, QueryFilter } from './types';

interface IdentifiableObject extends Object {
	id: number;
}

interface FilterResultsArgs {
	results: WP_REST_API_User[] | WP_REST_API_Search_Result[];
	excludeItems: Array<IdentifiableObject>;
}

export const filterOutExcludedItems = ({ results, excludeItems }: FilterResultsArgs) => {
	return results.filter((result) => {
		let keep = true;

		if (excludeItems.length) {
			keep = excludeItems.every((item) => item.id !== result.id);
		}

		return keep;
	});
};

interface PrepareSearchQueryArgs {
	keyword: string;
	page: number;
	mode: ContentSearchMode;
	perPage: number;
	contentTypes: Array<string>;
	queryFilter: QueryFilter;
}

/*
 * Prepares a search query based on the given keyword and page number.
 */
export const prepareSearchQuery = ({
	keyword,
	page,
	mode,
	perPage,
	contentTypes,
	queryFilter,
}: PrepareSearchQueryArgs): string => {
	let searchQuery;

	let fields = ['link', 'type', 'id', 'url', 'subtype'];

	if (mode === 'user') {
		fields.push('name');
	} else {
		fields.push('title');
	}

	/**
	 * Filter the fields to be fetched from the API.
	 *
	 * @param {string[]} fields - The fields to be fetched.
	 * @param {ContentSearchMode} mode - The mode of the content search.
	 * @returns {string[]} - The filtered fields.
	 */
	fields = applyFilters('tenup.contentSearch.queryFields', fields, mode) as string[];

	switch (mode) {
		case 'user':
			searchQuery = addQueryArgs('wp/v2/users', {
				search: keyword,
				_fields: fields,
			});
			break;
		default:
			searchQuery = addQueryArgs('wp/v2/search', {
				search: keyword,
				subtype: contentTypes.join(','),
				type: mode,
				_embed: true,
				per_page: perPage,
				page,
				_fields: fields,
			});

			break;
	}

	return queryFilter(searchQuery, {
		perPage,
		page,
		contentTypes,
		mode,
		keyword,
	});
};

interface NormalizeResultsArgs {
	mode: ContentSearchMode;
	results: WP_REST_API_Search_Result[] | WP_REST_API_User[];
	excludeItems: Array<IdentifiableObject>;
}

/*
 * Depending on the mode value, this method normalizes the format
 * of the result array.
 */
export const normalizeResults = ({
	mode,
	results,
	excludeItems,
}: NormalizeResultsArgs): Array<{
	id: number;
	subtype: ContentSearchMode | string;
	title: string;
	type: ContentSearchMode | string;
	url: string;
	info?: string;
}> => {
	const filteredResults = filterOutExcludedItems({ results, excludeItems });
	return filteredResults.map((item) => {
		let newItem: {
			id: number;
			subtype: ContentSearchMode | string;
			title: string;
			type: ContentSearchMode | string;
			url: string;
			info?: string;
		};

		switch (mode) {
			case 'user':
				const userItem = item as WP_REST_API_User;
				newItem = {
					id: userItem.id,
					subtype: mode,
					title: userItem.name,
					type: mode,
					url: userItem.link,
				};
				break;
			default:
				const searchItem = item as WP_REST_API_Search_Result;
				newItem = {
					id: searchItem.id as number,
					subtype: searchItem.subtype,
					title: searchItem.title,
					type: searchItem.type,
					url: searchItem.url,
				};
				break;
		}

		/**
		 * Filter the new item before returning it.
		 *
		 * @param {object} newItem - The item to be returned.
		 * @param {object} item - The original item from the search result.
		 * @return {object} - The filtered item.
		 */
		newItem = applyFilters('tenup.contentSearch.searchResult', newItem, item) as typeof newItem;

		return newItem;
	});
};

export type NormalizedSuggestions = ReturnType<typeof normalizeResults>;
export type NormalizedSuggestion = NormalizedSuggestions[number];

interface FetchSearchResultsArgs {
	keyword: string;
	page: number;
	mode: ContentSearchMode;
	perPage: number;
	contentTypes: Array<string>;
	queryFilter: QueryFilter;
	excludeItems: Array<IdentifiableObject>;
	signal?: AbortSignal;
}

export async function fetchSearchResults({
	keyword,
	page,
	mode,
	perPage,
	contentTypes,
	queryFilter,
	excludeItems,
	signal,
}: FetchSearchResultsArgs) {
	const searchQueryString = prepareSearchQuery({
		keyword,
		page,
		mode,
		perPage,
		contentTypes,
		queryFilter,
	});
	const response = await apiFetch<Response>({
		path: searchQueryString,
		parse: false,
		signal,
	});

	const totalPages = parseInt(
		(response.headers && response.headers.get('X-WP-TotalPages')) || '0',
		10,
	);

	let results: WP_REST_API_User[] | WP_REST_API_Search_Result[];

	switch (mode) {
		case 'user':
			results = (await response.json()) as WP_REST_API_User[];
			break;
		default:
			results = (await response.json()) as WP_REST_API_Search_Result[];
			break;
	}

	const normalizedResults = normalizeResults({ results, excludeItems, mode });

	const hasNextPage = totalPages > page;
	const hasPreviousPage = page > 1;

	return {
		results: normalizedResults,
		nextPage: hasNextPage ? page + 1 : undefined,
		previousPage: hasPreviousPage ? page - 1 : undefined,
	};
}
