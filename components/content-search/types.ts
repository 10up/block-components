/**
 * External dependencies
 */
import type { WP_REST_API_User, WP_REST_API_Search_Result } from 'wp-types';

/**
 * Internal dependencies
 */
import { NormalizedSuggestion } from './utils';

/**
 * Types
 */
export interface IdentifiableObject {
	id: number;
}

export interface SearchResult {
	id: number;
	title: string;
	url: string;
	type: string;
	subtype: string;
	link?: string;
	name?: string;
}

export interface QueryArgs {
	perPage: number;
	page: number;
	contentTypes: Array<string>;
	mode: ContentSearchMode;
	keyword: string;
}

export type QueryFilter = (query: string, args: QueryArgs) => string;

export interface RenderItemComponentProps {
	item: NormalizedSuggestion;
	onSelect: () => void;
	searchTerm?: string;
	isSelected?: boolean;
	id?: string;
	contentTypes: Array<string>;
	renderType?: (suggestion: NormalizedSuggestion) => string;
}

export type ContentSearchMode = 'post' | 'user' | 'term';

export type QueryFieldsFilter = (fields: string[], mode: ContentSearchMode) => string[];

export type SearchResultFilter = (
	item: NormalizedSuggestion,
	originalResult: WP_REST_API_Search_Result | WP_REST_API_User
) => NormalizedSuggestion;

export type Modify<T, R> = Omit<T, keyof R> & R;
