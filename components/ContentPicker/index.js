import PropTypes from 'prop-types';
import arrayMove from 'array-move';
import styled from '@emotion/styled';
import { select } from '@wordpress/data';
import { useState, useEffect, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { ContentSearch } from '../ContentSearch';
import SortableList from './SortableList';

const NAMESPACE = '10up-content-picker';

/**
 * Unfortunately, we had to use !important because on PickedItem we couldn't @emotion/styled css
 * as it was breaking sortability from react-sortable-hoc
 */
const StyleWrapper = styled('div')`
	& .block-editor-link-control__search-item {
		border: none !important;
		cursor: default;

		&:hover {
			background: transparent;
		}
	}
`;

/**
 * Content Picker
 *
 * @param {object} props React props
 * @param props.label
 * @param props.mode
 * @param props.contentTypes
 * @param props.placeholder
 * @param props.onPickChange
 * @param props.maxContentItems
 * @param props.isOrderable
 * @param props.singlePickedLabel
 * @param props.multiPickedLabel
 * @param props.content
 * @param props.uniqueContentItems
 * @param props.excludeCurrentPost
 * @returns {*} React JSX
 */
const ContentPicker = ({
	label,
	mode,
	contentTypes,
	placeholder,
	onPickChange,
	maxContentItems,
	isOrderable,
	singlePickedLabel,
	multiPickedLabel,
	content: presetContent,
	uniqueContentItems,
	excludeCurrentPost,
}) => {
	const [content, setContent] = useState(presetContent);

	const currentPostId = select('core/editor')?.getCurrentPostId();

	if (content.length && typeof content[0] !== 'object') {
		for (let i = 0; i < content.length; i++) {
			content[i] = {
				id: content[i],
				type: contentTypes[0],
			};
		}
	}

	// Run onPickChange callback when content changes.
	useEffect(() => {
		onPickChange(content);
	}, [content, onPickChange]);

	const handleSelect = (item) => {
		setContent((previousContent) => [
			{
				id: item.id,
				type: 'subtype' in item ? item.subtype : item.type,
			},
			...previousContent,
		]);
	};

	const onDeleteItem = (deletedItem) => {
		setContent((previousContent) => previousContent.filter(({ id }) => id !== deletedItem.id));
	};

	const excludeItems = useMemo(() => {
		const items = uniqueContentItems ? [...content] : [];

		if (excludeCurrentPost && currentPostId) {
			items.push({
				id: currentPostId,
			});
		}

		return items;
	}, [content, currentPostId, excludeCurrentPost, uniqueContentItems]);

	return (
		<div className={`${NAMESPACE}`}>
			{(!content.length || (content.length && content.length < maxContentItems)) && (
				<ContentSearch
					placeholder={placeholder}
					label={label}
					excludeItems={excludeItems}
					onSelectItem={handleSelect}
					contentTypes={contentTypes}
					mode={mode}
				/>
			)}
			{Boolean(content?.length) > 0 && (
				<StyleWrapper>
					<span
						style={{
							marginTop: '15px',
							marginBottom: '2px',
							display: 'block',
						}}
					>
						{content.length > 1 ? multiPickedLabel : singlePickedLabel}
					</span>

					<SortableList
						items={content}
						useDragHandle
						handleItemDelete={onDeleteItem}
						isOrderable={isOrderable}
						mode={mode}
						onSortEnd={({ oldIndex, newIndex }) => {
							const newContent = [...arrayMove(content, oldIndex, newIndex)];

							setContent(newContent);
						}}
					/>
				</StyleWrapper>
			)}
		</div>
	);
};

ContentPicker.defaultProps = {
	label: '',
	mode: 'post',
	onPickChange: (ids) => {
		console.log('Content picker list change', ids); // eslint-disable-line no-console
	},
	contentTypes: ['post', 'page'],
	placeholder: '',
	content: [],
	maxContentItems: 1,
	uniqueContentItems: true,
	isOrderable: false,
	excludeCurrentPost: true,
	multiPickedLabel: __('You have selected the following items:', '10up-block-components'),
	singlePickedLabel: __('You have selected the following item:', '10up-block-components'),
};

ContentPicker.propTypes = {
	contentTypes: PropTypes.array,
	content: PropTypes.array,
	placeholder: PropTypes.string,
	mode: PropTypes.string,
	label: PropTypes.string,
	multiPickedLabel: PropTypes.string,
	singlePickedLabel: PropTypes.string,
	isOrderable: PropTypes.bool,
	onPickChange: PropTypes.func,
	uniqueContentItems: PropTypes.bool,
	excludeCurrentPost: PropTypes.bool,
	maxContentItems: PropTypes.number,
};

export { ContentPicker };
