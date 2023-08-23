import { TextControl, Spinner, NavigableMenu, Button } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { useState, useRef, useEffect, useCallback, useMemo } from '@wordpress/element';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
// eslint-disable-next-line no-unused-vars
import { jsx, css } from '@emotion/react';
import SearchItem, { defaultRenderItemType } from './SearchItem';
/** @jsx jsx */

const NAMESPACE = 'tenup-content-search';

// Equalize height of list icons to match loader in order to reduce jumping.
const listMinHeight = '46px';

/**
 * Filters results.
 *
 * @param {object} args Arguments.
 * @param {Array} args.results Results.
 * @param {Array} args.excludeItems Exclude items.
 * @returns {Array} Filtered results.
 */
const filterResults = ({ results, excludeItems }) => {
	return results.filter((result) => {
		let keep = true;

		if (excludeItems.length) {
			keep = excludeItems.every((item) => item.id !== result.id);
		}

		return keep;
	});
};

/**
 * Prepares a search query based on the given keyword and page number.
 *
 * @param {object} args Arguments.
 * @param {string} args.keyword The search keyword.
 * @param {number} args.page The page number.
 * @param {string} args.mode The search mode.
 * @param {number} args.perPage The number of results per page.
 * @param {Array} args.contentTypes The content types to search for.
 * @param {Function} args.queryFilter The query filter function.
 * @returns {string} The prepared search query.
 */
const prepareSearchQuery = ({ keyword, page, mode, perPage, contentTypes, queryFilter }) => {
	let searchQuery;

	switch (mode) {
		case 'user':
			searchQuery = `wp/v2/users/?search=${keyword}`;
			break;
		default:
			searchQuery = `wp/v2/search/?search=${keyword}&subtype=${contentTypes.join(
				',',
			)}&type=${mode}&_embed&per_page=${perPage}&page=${page}`;
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

/**
 * Depending on the mode value, this method normalizes the format
 * of the result array.
 *
 * @param {object} args Arguments.
 * @param {string} args.mode Mode.
 * @param {Array} args.results Result.
 * @param {Array} args.excludeItems Exclude items.
 * @returns {Array} Normalized results.
 */
const normalizeResults = ({ mode, results = [], excludeItems }) => {
	const normalizedResults = filterResults({ results, excludeItems });

	if (mode === 'user') {
		return normalizedResults.map((item) => ({
			id: item.id,
			subtype: mode,
			title: item.name,
			type: mode,
			url: item.link,
		}));
	}

	return normalizedResults;
};

const listCSS = css`
	/* stylelint-disable */
	max-height: 350px;
	overflow-y: auto;

	&& {
		margin: 0;
		padding: 0;
		list-style: none;
	}
`;

const loadingCSS = css`
	/* Custom styles to reduce jumping while loading the results */
	min-height: ${listMinHeight};
	display: flex;
	align-items: center;
	justify-content: center;
`;

const loadMoreCSS = css`
	display: flex;
	justify-content: center;
	margin-top: 1em;

	button {
		/* Reduce the jumping of the width when text changes to "Loading" */
		min-width: 90px;
	}
`;

const ContentSearch = ({
	onSelectItem,
	placeholder,
	label,
	contentTypes,
	mode,
	perPage,
	queryFilter,
	excludeItems,
	renderItemType,
	fetchInitialResults,
}) => {
	const [searchString, setSearchString] = useState('');
	const [searchQueries, setSearchQueries] = useState({});
	const [selectedItem, setSelectedItem] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [isFocused, setIsFocused] = useState(false);
	const [fetchedInitialResults, setFetchedInitialResults] = useState(false);

	const mounted = useRef(true);
	const currentContentTypes = useRef(contentTypes);

	useEffect(
		() => () => {
			mounted.current = false;
		},
		[],
	);

	/**
	 * handleSelection
	 *
	 * update the selected item in state to either the selected item or null if the
	 * selected item does not have a valid id
	 *
	 * @param {*} item item
	 */
	const handleOnNavigate = (item) => {
		if (item === 0) {
			setSelectedItem(null);
		}

		setSelectedItem(item);
	};

	/**
	 * handleItemSelection
	 *
	 * reset the search input & item container
	 * trigger the onSelectItem callback passed in via props
	 *
	 * @param {*} item item
	 */
	const handleItemSelection = (item) => {
		setSearchString('');

		onSelectItem(item);
	};

	/**
	 * handleSearchStringChange
	 *
	 * Using the keyword and the list of tags that are linked to the parent
	 * block search for posts/terms/users that match and return them to the
	 * autocomplete component.
	 *
	 * @param {string} keyword search query string
	 * @param {string} page page query string
	 */
	const handleSearchStringChange = useCallback(
		(keyword, page) => {
			// Reset page and query on empty keyword.
			if (keyword.trim() === '') {
				setCurrentPage(1);
			}

			const preparedQuery = prepareSearchQuery({
				keyword,
				page,
				mode,
				perPage,
				contentTypes,
				queryFilter,
			});

			// Only do query if not cached or previously errored/cancelled
			if (!searchQueries[preparedQuery] || searchQueries[preparedQuery].controller === 1) {
				setSearchQueries((queries) => {
					const newQueries = {};

					// Remove errored or cancelled queries
					Object.keys(queries).forEach((query) => {
						if (queries[query].controller !== 1) {
							newQueries[query] = queries[query];
						}
					});

					newQueries[preparedQuery] = {
						results: null,
						controller: null,
						currentPage: page,
						totalPages: null,
					};

					return newQueries;
				});
			}

			setCurrentPage(page);

			setSearchString(keyword);
		},
		[searchQueries, mode, perPage, contentTypes, queryFilter],
	);

	useEffect(() => {
		// Trigger initial fetch if enabled.
		if (fetchInitialResults && !fetchedInitialResults) {
			setFetchedInitialResults(true);
			handleSearchStringChange('', 1);
		}
	}, [fetchInitialResults, fetchedInitialResults, handleSearchStringChange]);

	// Handle a change to the content types
	useEffect(() => {
		if (JSON.stringify(contentTypes) !== JSON.stringify(currentContentTypes.current)) {
			currentContentTypes.current = contentTypes;
			setCurrentPage(1);
			handleSearchStringChange(searchString, 1);
		}
	}, [contentTypes, searchString, handleSearchStringChange]);

	useEffect(() => {
		Object.keys(searchQueries).forEach(async (searchQueryString) => {
			const searchQuery = searchQueries[searchQueryString];

			if (
				searchQueryString !==
				prepareSearchQuery({
					keyword: searchString,
					page: currentPage,
					mode,
					perPage,
					contentTypes,
					queryFilter,
				})
			) {
				if (searchQuery.controller?.abort) {
					searchQuery.controller.abort();
				}
			} else if (searchQuery.results === null && searchQuery.controller === null) {
				const controller = new AbortController();

				try {
					const resultsResponse = await apiFetch({
						path: searchQueryString,
						signal: controller.signal,
						parse: false,
					});

					const totalPages = parseInt(
						resultsResponse.headers?.get('X-WP-TotalPages') ?? '0',
						10,
					);

					let results = await resultsResponse.json();

					if (results && !Array.isArray(results)) {
						results = [results];
					}

					const normalizedResults = normalizeResults({ results, mode, excludeItems });

					if (!mounted.current) {
						return;
					}

					setSearchQueries((queries) => ({
						...queries,
						[searchQueryString]: {
							results: normalizedResults,
							controller: 0,
							totalPages,
						},
					}));
				} catch (error) {
					if (error.code !== 'fetch_error' && mounted.current) {
						setSearchQueries((queries) => ({
							...queries,
							[searchQueryString]: {
								results: [],
								controller: 1,
							},
						}));
					}
				}

				if (!mounted.current) {
					return;
				}

				setSearchQueries((queries) => ({
					...queries,
					[searchQueryString]: {
						...queries[searchQueryString],
						controller,
					},
				}));
			}
		});
	}, [
		searchQueries,
		searchString,
		currentPage,
		mode,
		excludeItems,
		perPage,
		contentTypes,
		queryFilter,
	]);

	const { searchResults, isLoading, showLoadMore } = useMemo(() => {
		let results = null;
		let isLoading = true;
		let showLoadMore = false;

		const searchQueryKeys = Object.keys(searchQueries);

		for (let i = 1; i <= currentPage; i++) {
			for (const searchQueryString of searchQueryKeys) {
				const searchQuery = searchQueries[searchQueryString];

				if (
					searchQueryString ===
					prepareSearchQuery({
						keyword: searchString,
						page: i,
						mode,
						perPage,
						contentTypes,
						queryFilter,
					})
				) {
					if (searchQuery.results !== null) {
						if (results === null) {
							results = [];
						}

						results = results.concat(searchQuery.results);

						if (i === currentPage) {
							isLoading = false;

							if (searchQuery.totalPages > searchQuery.currentPage) {
								showLoadMore = true;
							}
						}
					} else if (searchQuery.controller === 1 && i === currentPage) {
						isLoading = false;
						showLoadMore = false;
					}
				}
			}
		}

		if (results !== null) {
			results = filterResults({ results, excludeItems });
		}

		return { searchResults: results, isLoading, showLoadMore };
	}, [
		searchQueries,
		searchString,
		currentPage,
		excludeItems,
		mode,
		perPage,
		contentTypes,
		queryFilter,
	]);

	const hasSearchString = !!searchString.length;
	const hasSearchResults = searchResults && !!searchResults.length;
	const hasInitialResults = fetchInitialResults && isFocused;

	return (
		<NavigableMenu onNavigate={handleOnNavigate} orientation="vertical">
			<TextControl
				label={label}
				value={searchString}
				onChange={(newSearchString) => {
					handleSearchStringChange(newSearchString, 1);
				}}
				placeholder={placeholder}
				autoComplete="off"
				onFocus={() => {
					setIsFocused(true);
				}}
				onBlur={() => {
					setIsFocused(false);
				}}
			/>

			{hasSearchString || hasInitialResults ? (
				<>
					<ul className={`${NAMESPACE}-list`} css={listCSS}>
						{isLoading && currentPage === 1 && (
							<div css={loadingCSS}>
								<Spinner />
							</div>
						)}

						{!isLoading && !hasSearchResults && (
							<li
								className={`${NAMESPACE}-list-item components-button`}
								style={{ color: 'inherit', cursor: 'default', paddingLeft: '3px' }}
							>
								{__('Nothing found.', '10up-block-components')}
							</li>
						)}
						{(!isLoading || currentPage > 1) &&
							searchResults.map((item, index) => {
								if (!item.title.length) {
									return null;
								}

								return (
									<li
										key={item.id}
										className={`${NAMESPACE}-list-item`}
										style={{
											marginBottom: '0',
										}}
									>
										<SearchItem
											onClick={() => handleItemSelection(item)}
											searchTerm={searchString}
											suggestion={item}
											contentTypes={contentTypes}
											isSelected={selectedItem === index + 1}
											renderType={renderItemType}
										/>
									</li>
								);
							})}
					</ul>

					{!isLoading && hasSearchResults && showLoadMore && (
						<div css={loadMoreCSS}>
							<Button
								onClick={() => {
									handleSearchStringChange(searchString, currentPage + 1);
								}}
								type="button"
								className="components-button is-secondary"
							>
								{__('Load more', '10up-block-components')}
							</Button>
						</div>
					)}

					{isLoading && currentPage > 1 && (
						<div css={loadMoreCSS}>
							<Spinner />
						</div>
					)}
				</>
			) : null}
		</NavigableMenu>
	);
};

ContentSearch.defaultProps = {
	contentTypes: ['post', 'page'],
	placeholder: '',
	perPage: 20,
	label: '',
	mode: 'post',
	excludeItems: [],
	queryFilter: (query) => query,
	onSelectItem: () => {
		console.log('Select!'); // eslint-disable-line no-console
	},
	renderItemType: defaultRenderItemType,
	fetchInitialResults: false,
};

ContentSearch.propTypes = {
	contentTypes: PropTypes.array,
	mode: PropTypes.oneOf(['post', 'user', 'term']),
	onSelectItem: PropTypes.func,
	queryFilter: PropTypes.func,
	placeholder: PropTypes.string,
	excludeItems: PropTypes.array,
	label: PropTypes.string,
	perPage: PropTypes.number,
	renderItemType: PropTypes.func,
	fetchInitialResults: PropTypes.bool,
};

export { ContentSearch };
