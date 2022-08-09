import { TextControl, Spinner, NavigableMenu, Button } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { useState, useRef, useEffect, useCallback } from '@wordpress/element';
import PropTypes from 'prop-types';
import { __ } from '@wordpress/i18n';
// eslint-disable-next-line no-unused-vars
import { jsx, css } from '@emotion/react';
import SearchItem from './SearchItem';
/** @jsx jsx */

const NAMESPACE = 'tenup-content-search';

// Equalize height of list icons to match loader in order to reduce jumping.
const listMinHeight = '46px';

const ContentSearch = ({
	onSelectItem,
	placeholder,
	label,
	contentTypes,
	mode,
	perPage,
	queryFilter,
	excludeItems,
	fetchInitialResults,
}) => {
	const [searchString, setSearchString] = useState('');
	const [searchQueries, setSearchQueries] = useState({});
	const [selectedItem, setSelectedItem] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [isFocused, setIsFocused] = useState(false);

	const mounted = useRef(true);

	const filterResults = useCallback(
		(results) => {
			return results.filter((result) => {
				let keep = true;

				if (excludeItems.length) {
					keep = excludeItems.every((item) => item.id !== result.id);
				}

				return keep;
			});
		},
		[excludeItems],
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

	const prepareSearchQuery = useCallback(
		(keyword, page) => {
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
		},
		[perPage, contentTypes, mode, queryFilter],
	);

	/**
	 * Depending on the mode value, this method normalizes the format
	 * of the result array.
	 *
	 * @param {string} mode ContentPicker mode.
	 * @param {Array} result The array to be normalized.
	 * @returns {Array} The normalizes array.
	 */
	const normalizeResults = useCallback(
		(result = []) => {
			const normalizedResults = filterResults(result);

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
		},
		[mode, filterResults],
	);

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
	const handleSearchStringChange = (keyword, page) => {
		// Reset page and query on empty keyword.
		if (keyword.trim() === '') {
			setCurrentPage(1);
		}

		const preparedQuery = prepareSearchQuery(keyword, page);

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
	};

	const handleLoadMore = () => {
		handleSearchStringChange(searchString, currentPage + 1);
	};

	useEffect(() => {
		// Trigger initial fetch if enabled.
		if (fetchInitialResults) {
			handleSearchStringChange('', 1);
		}

		return () => {
			mounted.current = false;
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		Object.keys(searchQueries).forEach((searchQueryString) => {
			const searchQuery = searchQueries[searchQueryString];

			if (searchQueryString !== prepareSearchQuery(searchString, currentPage)) {
				if (searchQuery.controller && typeof searchQuery.controller === 'object') {
					searchQuery.controller.abort();
				}
			} else if (searchQuery.results === null && searchQuery.controller === null) {
				const controller = new AbortController();

				apiFetch({
					path: searchQueryString,
					signal: controller.signal,
					parse: false,
				})
					.then((results) => {
						const totalPages = parseInt(
							results.headers && results.headers.get('X-WP-TotalPages'),
							10,
						);

						// Parse, because we set parse to false to get the headers.
						results.json().then((results) => {
							if (mounted.current === false) {
								return;
							}
							const normalizedResults = normalizeResults(results);

							setSearchQueries((queries) => {
								const newQueries = { ...queries };

								newQueries[searchQueryString].results = normalizedResults;
								newQueries[searchQueryString].totalPages = totalPages;
								newQueries[searchQueryString].controller = 0;

								return newQueries;
							});
						});
					})
					.catch((error) => {
						// fetch_error means the request was aborted
						if (error.code !== 'fetch_error') {
							setSearchQueries((queries) => {
								const newQueries = { ...queries };

								newQueries[searchQueryString].controller = 1;
								newQueries[searchQueryString].results = [];

								return newQueries;
							});
						}
					});

				setSearchQueries((queries) => {
					const newQueries = { ...queries };

					newQueries[searchQueryString].controller = controller;

					return newQueries;
				});
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchQueries, searchString, currentPage]);

	let searchResults = null;
	let isLoading = true;
	let showLoadMore = false;

	for (let i = 1; i <= currentPage; i++) {
		// eslint-disable-next-line no-loop-func
		Object.keys(searchQueries).forEach((searchQueryString) => {
			const searchQuery = searchQueries[searchQueryString];

			if (searchQueryString === prepareSearchQuery(searchString, i)) {
				if (searchQuery.results !== null) {
					if (searchResults === null) {
						searchResults = [];
					}

					searchResults = searchResults.concat(searchQuery.results);

					// If on last page, maybe show load more button
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
		});
	}

	const hasSearchString = !!searchString.length;
	const hasSearchResults = searchResults && !!searchResults.length;
	const hasInitialResults = fetchInitialResults && isFocused;

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
										/>
									</li>
								);
							})}
					</ul>

					{!isLoading && hasSearchResults && showLoadMore && (
						<div css={loadMoreCSS}>
							<Button
								onClick={handleLoadMore}
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
	fetchInitialResults: PropTypes.bool,
};

export { ContentSearch };
