import { useBlockEditContext } from '@wordpress/block-editor';
import { useSelect, dispatch } from '@wordpress/data';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import PropTypes from 'prop-types';

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
	const { updateBlockAttributes } = dispatch('core/editor');

	const { repeaterData, defaultRepeaterData } = useSelect((select) => {
		const { getBlockAttributes } = select('core/editor');
		const { getBlockType } = select('core/blocks');

		return {
			repeaterData: getBlockAttributes(clientId),
			defaultRepeaterData: getBlockType(name).attributes[attribute].default,
		};
	});

	/**
	 * Adds a new repeater item.
	 */
	function addItem() {
		updateBlockAttributes(clientId, {
			[attribute]: [...repeaterData[attribute], defaultRepeaterData],
		});
	}

	/**
	 * Updates the item currently being edited.
	 *
	 * @param {number} index The index at which the item should be updated.
	 * @param {string|number|boolean} value The value that should be used to updated the item.
	 */
	function setItem(index, value) {
		const repeaterDataCopy = repeaterData[attribute].slice();
		repeaterDataCopy[index] = value;
		updateBlockAttributes(clientId, { [attribute]: repeaterDataCopy });
	}

	/**
	 * Removes an item from the list.
	 *
	 * @param {number} index The index of the item that needs to be removed.
	 */
	function removeItem(index) {
		const repeaterDataCopy = repeaterData[attribute]
			.slice()
			.filter((item, innerIndex) => index !== innerIndex);
		updateBlockAttributes(clientId, { [attribute]: repeaterDataCopy });
	}

	return (
		<>
			{repeaterData[attribute].map((item, key) => {
				return children(item, key, setItem, removeItem);
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
	children: () => null,
	attribute: 'items',
	addButton: null,
};

Repeater.propTypes = {
	children: PropTypes.func,
	attribute: PropTypes.string,
	addButton: PropTypes.func,
};
