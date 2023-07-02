import PropTypes from 'prop-types';
import { useDispatch } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import { useBlockEditContext } from '@wordpress/block-editor';
import { v4 as uuidv4 } from 'uuid';
import { store as editorStore } from '@wordpress/editor';
import { store as requiredFieldsStore } from './store';

import './filters';

export const Required = ({ value, children }) => {
	const { clientId } = useBlockEditContext();
	const { current: componentId } = useRef( uuidv4() );

	const { appendComponentId, removeComponentId } = useDispatch( requiredFieldsStore );
	const { lockPostSaving, unlockPostSaving } = useDispatch( editorStore );


	const isEmpty = '' === value || null === value || undefined === value;

	// Disable post saving when required field(s) are empty.
	useEffect( () => {
		if ( isEmpty ) {
			lockPostSaving( componentId );
		} else {
			unlockPostSaving( componentId );
		}

		return () => {
			unlockPostSaving( componentId );
		};
	}, [ value ] );

	useEffect( () => {
		if ( isEmpty ) {
			appendComponentId( clientId, componentId );
		} else {
			removeComponentId( clientId, componentId );
		}
	}, [ isEmpty ] );

	return children;
};

Required.defaultProps = {
	value: '',
};

Required.propTypes = {
	value: PropTypes.string || PropTypes.bool,
	children: PropTypes.node.isRequired,
};
