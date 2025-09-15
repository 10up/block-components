/* eslint-disable no-case-declarations */
/**
 * External dependencies
 */
import type { WP_REST_API_User, WP_REST_API_Search_Result } from 'wp-types';

/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Types
 */
import type {
	ContentSearchMode,
	QueryFilter,
	QueryFieldsFilter,
	SearchResultFilter,
} from './types';

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
	queryFieldsFilter?: QueryFieldsFilter;
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
	queryFieldsFilter,
}: PrepareSearchQueryArgs): string => {
	let searchQuery;

	let fields = ['link', 'type', 'id', 'url', 'subtype'];

	if (mode === 'user') {
		fields.push('name');
	} else {
		fields.push('title');
	}

	if (queryFieldsFilter) {
		fields = queryFieldsFilter(fields, mode);
	}

	if (!fields.includes('_links')) {
		fields.push('_links');
	}
	if (!fields.includes('_embedded')) {
		fields.push('_embedded');
	}

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
	searchResultFilter?: SearchResultFilter;
}

/**
 * Convert a WP "rendered" title (which can contain HTML + entities) into plain text.
 * - Strips any HTML tags.
 * - Decodes HTML entities.
 * - Normalizes NBSP and trims.
 */
export const toPlainTextTitle = (input: string | undefined | null): string => {
	if (!input) {
		return '';
	}

	const doc = new DOMParser().parseFromString(String(input), 'text/html');
	const text = doc.body.textContent ?? '';

	return decodeEntities(text).replace(/\u00A0/g, ' ').trim();
};

/*
 * Depending on the mode value, this method normalizes the format
 * of the result array.
 */
export const normalizeResults = ({
	mode,
	results,
	excludeItems,
	searchResultFilter,
}: NormalizeResultsArgs): Array<{
	id: number;
	subtype: ContentSearchMode | string;
	title: string;
	type: ContentSearchMode | string;
	url: string;
	info?: string;
	embedded?: WP_REST_API_Search_Result['_embedded'] | WP_REST_API_User['_embedded'];
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
			embedded?: WP_REST_API_Search_Result['_embedded'] | WP_REST_API_User['_embedded'];
		};

		switch (mode) {
			case 'user':
				const userItem = item as WP_REST_API_User;
				newItem = {
					id: userItem.id,
					subtype: mode,
					title: toPlainTextTitle(userItem.name),
					type: mode,
					url: userItem.link,
					embedded: userItem._embedded,
				};
				break;
			default:
				const searchItem = item as WP_REST_API_Search_Result;
				newItem = {
					id: searchItem.id as number,
					subtype: searchItem.subtype,
					title: toPlainTextTitle(searchItem.title),
					type: searchItem.type,
					url: searchItem.url,
					embedded: searchItem._embedded,
				};
				break;
		}

		if (searchResultFilter) {
			newItem = searchResultFilter(newItem, item);
		}

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
	queryFieldsFilter?: QueryFieldsFilter;
	searchResultFilter?: SearchResultFilter;
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
	queryFieldsFilter,
	searchResultFilter,
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
		queryFieldsFilter,
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

	const normalizedResults = normalizeResults({ results, excludeItems, mode, searchResultFilter });

	const hasNextPage = totalPages > page;
	const hasPreviousPage = page > 1;

	return {
		results: normalizedResults,
		nextPage: hasNextPage ? page + 1 : undefined,
		previousPage: hasPreviousPage ? page - 1 : undefined,
	};
}
