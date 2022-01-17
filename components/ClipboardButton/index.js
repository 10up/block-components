import PropTypes from 'prop-types';
import { useCopyToClipboard } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export const ClipboardButton = (props) => {
	const { text, disabled, onSuccess, label } = props;
	const [hasCopied, setHasCopied] = useState(false);
	const buttonLabel = label(hasCopied);

	useEffect(() => {
		if (hasCopied) {
			setTimeout(() => {
				setHasCopied(false);
			}, 3000);
		}
	}, [hasCopied]);

	function successfullyCopied() {
		/**
		 * The 'copied' label stays for 3 seconds.
		 * We don't want to save again within the same time frame.
		 */
		if (hasCopied) {
			return;
		}

		onSuccess();
		setHasCopied(true);
	}

	const ref = useCopyToClipboard(text, successfullyCopied);

	return (
		<Button disabled={disabled} ref={ref}>
			{buttonLabel}
		</Button>
	);
};

ClipboardButton.defaultProps = {
	text: '',
	disabled: false,
	onSuccess: () => {},
	label: (hasCopied) => (hasCopied ? __('Copied') : __('Copy')),
};

ClipboardButton.propTypes = {
	text: PropTypes.string,
	disabled: PropTypes.bool,
	onSuccess: PropTypes.func,
	label: PropTypes.func,
};
