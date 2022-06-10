import { useBlockEditContext, store as blockEditorStore } from '@wordpress/block-editor';
import { store as blocksStore } from '@wordpress/blocks';
import { useSelect, dispatch } from '@wordpress/data';
import { useEffect } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';
import { v4 as uuid } from 'uuid';

/**
 * The Repeater Component.
 *
 * @param {object} props React props
 * @param {Function} props.children Render prop to render the children.
 * @param {string} props.attribute property of the block attribute that will provide data for Repeater.
 * @param {string} props.addButton render prop to customize the "Add item" button.
 * @returns {*} React JSX
 */
export const Repeater = ({ children, attribute, addButton }) => {
	const { clientId, name } = useBlockEditContext();
	const { updateBlockAttributes } = dispatch(blockEditorStore);

	const { repeaterData, defaultRepeaterData } = useSelect((select) => {
		const { getBlockAttributes } = select(blockEditorStore);
		const { getBlockType } = select(blocksStore);

		return {
			repeaterData: getBlockAttributes(clientId)[attribute],
			defaultRepeaterData: getBlockType(name).attributes[attribute].default,
		};
	});

	useEffect(() => {
		updateBlockAttributes(clientId, {
			[attribute]: repeaterData.map((item) => {
				item.uuid = uuid();
				return item;
			}),
		});
	}, []);

	/**
	 * Adds a new repeater item.
	 */
	function addItem() {
		const defaultRepeaterDataCopy = JSON.parse(JSON.stringify(defaultRepeaterData));

		if (!defaultRepeaterData.length) {
			defaultRepeaterDataCopy.push([]);
		}

		defaultRepeaterDataCopy[0].uuid = uuid();

		updateBlockAttributes(clientId, {
			[attribute]: [...repeaterData, ...defaultRepeaterDataCopy],
		});
	}

	/**
	 * Updates the item currently being edited.
	 *
	 * @param {string|number|boolean} value The value that should be used to updated the item.
	 * @param {number} index The index at which the item should be updated.
	 */
	function setItem(value, index) {
		const repeaterDataCopy = JSON.parse(JSON.stringify(repeaterData));

		if (typeof value === 'object' && value !== null) {
			repeaterDataCopy[index] = { ...repeaterDataCopy[index], ...value };
		} else {
			repeaterDataCopy[index] = value;
		}
		updateBlockAttributes(clientId, { [attribute]: repeaterDataCopy });
	}

	/**
	 * Removes an item from the list.
	 *
	 * @param {number} index The index of the item that needs to be removed.
	 */
	function removeItem(index) {
		const repeaterDataCopy = JSON.parse(JSON.stringify(repeaterData)).filter(
			(item, innerIndex) => index !== innerIndex,
		);
		updateBlockAttributes(clientId, { [attribute]: repeaterDataCopy });
	}

	const itemIds = repeaterData.map((item) => item.uuid);

	return (
		<>
			{repeaterData.map((item, key) => {
				return children(
					item,
					item.uuid,
					(val) => setItem(val, key),
					() => removeItem(key),
				);
			})}
			{typeof addButton === 'function' ? (
				addButton(addItem)
			) : (
				<Button variant="primary" onClick={() => addItem()}>
					{__('Add item')}
				</Button>
			)}
		</>
	);
};

Repeater.defaultProps = {
	attribute: 'items',
	addButton: null,
};

Repeater.propTypes = {
	children: PropTypes.func.isRequired,
	attribute: PropTypes.string,
	addButton: PropTypes.func,
};
