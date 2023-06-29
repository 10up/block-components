import PropTypes from 'prop-types';
import { useDispatch } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import { v4 as uuidv4 } from 'uuid';
import { store as editorStore } from '@wordpress/editor';


export const Required = ({ value, children }) => {
	const { current: componentId } = useRef( uuidv4() );
	const { lockPostSaving, unlockPostSaving } = useDispatch( editorStore );

	useEffect( () => {
		if ( ! value ) {
			lockPostSaving( componentId );
		} else {
			unlockPostSaving( componentId );
		}

		return () => unlockPostSaving( componentId );
	}, [ value ] );

	return children;
};

Required.defaultProps = {
	value: '',
};

Required.propTypes = {
	value: PropTypes.string || PropTypes.bool,
	children: PropTypes.node.isRequired,
};
