import styled from '@emotion/styled';
import { safeHTML } from '@wordpress/dom';
import { safeDecodeURI, filterURLForDisplay } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';
import {
	Button,
	TextHighlight,
	Tooltip,
	__experimentalTruncate as Truncate,
} from '@wordpress/components';
import { getTextContent, create } from '@wordpress/rich-text';
import { RenderItemComponentProps } from './types';
import { NormalizedSuggestion } from './utils';

const SearchItemWrapper = styled(Button)`
	&&& {
		display: flex;
		flex-direction: column;
		text-align: left;
		width: 100%;
		align-items: flex-start;
		border-radius: 2px;
		box-sizing: border-box;
		height: auto !important;
		padding: 0.3em 0.7em;
		overflow: hidden;

		&:hover {
			/* Add opacity background to support future color changes */
			/* Reduce background from #ddd to 0.05 for text contrast  */
			background-color: rgba(0, 0, 0, 0.05);
		}
	}
`;

const SearchItemHeaderWrapper = styled.span`
	display: flex;
	flex-direction: row;
	width: 100%;
	justify-content: space-between;
	align-items: center;
`;

const SearchItemHeader = styled.span`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
`;

const SearchItemTitle = styled.span<{ showType: boolean }>`
	padding-right: ${({ showType }) => (showType ? 0 : undefined)};
`;

const SearchItemURL = styled.span<{ showType: boolean }>`
	padding-right: ${({ showType }) => (showType ? 0 : undefined)};
`;

const SearchItemInfo = styled.span`
	font-size: 0.75rem;
	line-height: 1.4;
	color: #757575;
	margin-top: 4px;
`;

const SearchItemType = styled.span`
	background-color: rgba(0, 0, 0, 0.05);
	color: black;
	padding: 2px 4px;
	text-transform: capitalize;
	border-radius: 2px;
	flex-shrink: 0;
`;

const StyledTextHighlight = styled(TextHighlight)`
	margin: 0 !important;
	padding: 0 !important;
`;

export function defaultRenderItemType(suggestion: NormalizedSuggestion): string {
	// Rename 'post_tag' to 'tag'. Ideally, the API would return the localized CPT or taxonomy label.
	if (suggestion.type === 'post_tag') {
		return 'tag';
	}

	if (suggestion.subtype) {
		return suggestion.subtype;
	}

	return suggestion.type;
}

const SearchItem: React.FC<RenderItemComponentProps> = ({
	item: suggestion,
	onSelect: onClick,
	searchTerm = '',
	id = '',
	contentTypes,
	renderType = defaultRenderItemType,
}) => {
	const { type, title, url, info } = suggestion;
	const showType = !!(type && contentTypes.length > 1);

	const richTextContent = create({ html: title });
	const textContent = getTextContent(richTextContent);
	const titleContent = decodeEntities(textContent);

	return (
		<Tooltip text={decodeEntities(title)}>
			<SearchItemWrapper id={id} onClick={onClick}>
				<SearchItemHeaderWrapper>
					<SearchItemHeader>
						<SearchItemTitle showType={showType}>
							<StyledTextHighlight text={titleContent} highlight={searchTerm} />
						</SearchItemTitle>
						{url && (
							<SearchItemURL aria-hidden showType={showType}>
								<Truncate numberOfLines={1} limit={55} ellipsizeMode="middle">
									{filterURLForDisplay(safeDecodeURI(url)) || ''}
								</Truncate>
							</SearchItemURL>
						)}
					</SearchItemHeader>
					{showType && <SearchItemType>{renderType(suggestion)}</SearchItemType>}
				</SearchItemHeaderWrapper>
				{info && (
					<SearchItemInfo
						dangerouslySetInnerHTML={{
							__html: safeHTML(info),
						}}
					/>
				)}
			</SearchItemWrapper>
		</Tooltip>
	);
};

export default SearchItem;
