import { Spinner, NavigableMenu, Button, SearchControl } from '@wordpress/components';
import { useState, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import styled from '@emotion/styled';
import { useMergeRefs } from '@wordpress/compose';
import { QueryClient, QueryClientProvider, useInfiniteQuery } from '@tanstack/react-query';
import SearchItem from './SearchItem';
import { StyledComponentContext } from '../styled-components-context';
import type {
	ContentSearchMode,
	IdentifiableObject,
	QueryFilter,
	RenderItemComponentProps,
} from './types';
import { useDebouncedInput } from '../../hooks/use-debounced-input';
import { useOnClickOutside } from '../../hooks/use-on-click-outside';
import { NormalizedSuggestion, fetchSearchResults } from './utils';

const queryClient = new QueryClient();

// Equalize height of list icons to match loader in order to reduce jumping.
const listMinHeight = '46px';

const List = styled.ul`
	max-height: 350px;
	overflow-y: auto;
	list-style: none !important;
	margin: 0;
	padding: 0 !important;
`;

const ListItem = styled.li`
	margin-bottom: 0;
`;

const StyledSpinner = styled(Spinner)`
	/* Custom styles to reduce jumping while loading the results */
	min-height: ${listMinHeight};
	display: flex;
	align-items: center;
	justify-content: center;
`;

const LoadingContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 1em;

	button {
		/* Reduce the jumping of the width when text changes to "Loading" */
		min-width: 90px;
	}
`;

const StyledNavigableMenu = styled(NavigableMenu)`
	width: 100%;
`;

const StyledSearchControl = styled(SearchControl)`
	width: 100%;
`;

const StyledNoResults = styled.li`
	color: inherit;
	cursor: default;
	padding-left: 3px;
`;

export type ContentSearchOptions = {
	inputDelay: number;
};

export interface ContentSearchProps {
	onSelectItem: (item: NormalizedSuggestion) => void;
	placeholder?: string;
	label?: string;
	hideLabelFromVision?: boolean;
	contentTypes?: Array<string>;
	mode?: ContentSearchMode;
	perPage?: number;
	queryFilter?: QueryFilter;
	excludeItems?: Array<IdentifiableObject>;
	renderItemType?: (props: NormalizedSuggestion) => string;
	renderItem?: (props: RenderItemComponentProps) => JSX.Element;
	fetchInitialResults?: boolean;
	options?: ContentSearchOptions;
}

const ContentSearchNoResults: React.FC = () => (
	<StyledNoResults className="tenup-content-search-list-item components-button">
		{__('Nothing found.', '10up-block-components')}
	</StyledNoResults>
);

const ContentSearch: React.FC<ContentSearchProps> = ({
	onSelectItem = () => {
		console.log('Select!'); // eslint-disable-line no-console
	},
	placeholder = '',
	label,
	hideLabelFromVision = true,
	contentTypes = ['post', 'page'],
	mode = 'post',
	perPage = 20,
	queryFilter = (query: string) => query,
	excludeItems = [],
	renderItemType = undefined,
	renderItem: SearchResultItem = SearchItem,
	fetchInitialResults,
	options,
}) => {
	const debounceOptions =
		options && options.inputDelay ? { delay: options.inputDelay } : undefined;
	const [searchInput, setSearchString, searchString] = useDebouncedInput('', debounceOptions);
	const [isFocused, setIsFocused] = useState(false);
	const searchContainer = useRef<HTMLDivElement>(null);

	const handleItemSelection = (item: NormalizedSuggestion) => {
		setSearchString('');
		setIsFocused(false);
		onSelectItem(item);
	};

	const clickOutsideRef = useOnClickOutside(() => {
		setIsFocused(false);
	});

	const mergedRef = useMergeRefs([searchContainer, clickOutsideRef]);

	const { status, data, error, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
		useInfiniteQuery({
			queryKey: ['search', searchString, contentTypes.join(','), mode, perPage, queryFilter],
			queryFn: async ({ pageParam = 1, signal }) =>
				fetchSearchResults({
					keyword: searchString,
					page: pageParam,
					mode,
					perPage,
					contentTypes,
					queryFilter,
					excludeItems,
					signal,
				}),
			getNextPageParam: (lastPage) => lastPage.nextPage,
			getPreviousPageParam: (firstPage) => firstPage.previousPage,
			initialPageParam: 1,
		});

	const searchResults = data?.pages.map((page) => page?.results).flat() || undefined;

	const hasSearchString = !!searchString.length;
	const hasSearchResults = status === 'success' && searchResults && !!searchResults.length;
	const hasInitialResults = fetchInitialResults && isFocused;
	const hasNoResults = !!error || (!isFetching && !hasSearchResults);
	const isPending = status === 'pending';

	return (
		<StyledNavigableMenu ref={mergedRef} orientation="vertical">
			<StyledSearchControl
				value={searchInput}
				onChange={(newSearchString: string) => {
					setSearchString(newSearchString);
				}}
				label={label}
				hideLabelFromVision={hideLabelFromVision}
				placeholder={placeholder}
				autoComplete="off"
				onFocus={() => {
					setIsFocused(true);
				}}
			/>

			{hasSearchString || hasInitialResults ? (
				<>
					<List className="tenup-content-search-list">
						{isPending && <StyledSpinner />}
						{hasNoResults && <ContentSearchNoResults />}
						{hasSearchResults &&
							searchResults.map((item) => {
								const selectItem = () => {
									handleItemSelection(item);
								};
								return (
									<ListItem
										key={item.id}
										className="tenup-content-search-list-item"
									>
										<SearchResultItem
											item={item}
											onSelect={selectItem}
											searchTerm={searchString}
											contentTypes={contentTypes}
											renderType={renderItemType}
										/>
									</ListItem>
								);
							})}
					</List>

					{hasSearchResults && hasNextPage && (
						<LoadingContainer>
							<Button onClick={() => fetchNextPage()} variant="secondary">
								{__('Load more', '10up-block-components')}
							</Button>
						</LoadingContainer>
					)}

					{isFetchingNextPage && <StyledSpinner />}
				</>
			) : null}
		</StyledNavigableMenu>
	);
};

const ContentSearchWrapper: React.FC<ContentSearchProps> = (props) => {
	return (
		<StyledComponentContext cacheKey="tenup-component-content-search">
			<QueryClientProvider client={queryClient}>
				<ContentSearch {...props} />
			</QueryClientProvider>
		</StyledComponentContext>
	);
};

export { ContentSearchWrapper as ContentSearch };
