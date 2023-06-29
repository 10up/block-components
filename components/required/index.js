import PropTypes from 'prop-types';
import { useDispatch, useSelect } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import { v4 as uuidv4 } from 'uuid';
import { store as editorStore } from '@wordpress/editor';
import { store as requiredFieldsStore } from './store';

const lockKey = 'tenup-required-fields-lock-post'

export const Required = ({ value, children }) => {
	const { current: componentId } = useRef( uuidv4() );
	const { lockPostSaving, unlockPostSaving } = useDispatch( editorStore );
	const { setIsFilled } = useDispatch( requiredFieldsStore );

	useEffect( () => {
		setIsFilled( componentId, !! value );
	}, [ value ] );

	const { shouldLock } = useSelect( ( select ) => {
		return {
			shouldLock: select( requiredFieldsStore ).shouldLock(),
		}
	} );

	useEffect( () => {
		if ( shouldLock ) {
			lockPostSaving( lockKey );
		} else {
			unlockPostSaving( lockKey );
		}

		return () => unlockPostSaving( lockKey );
	}, [ shouldLock ] );

	return children;
};

Required.defaultProps = {
	value: '',
};

Required.propTypes = {
	value: PropTypes.string || PropTypes.bool,
	children: PropTypes.node.isRequired,
};
