import PropTypes from 'prop-types';
import { useCopyToClipboard } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export const ClipboardButton = (props) => {
	const { text, disabled, onSuccess, labels } = props;
	const [hasCopied, setHasCopied] = useState(false);
	const copy = labels.copy ? labels.copy : __('Copy');
	const copied = labels.copied ? labels.copied : __('Copied');

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
			{hasCopied ? copied : copy}
		</Button>
	);
};

ClipboardButton.defaultProps = {
	text: '',
	disabled: false,
	onSuccess: () => {},
	labels: {},
};

ClipboardButton.propTypes = {
	text: PropTypes.string,
	disabled: PropTypes.bool,
	onSuccess: PropTypes.func,
	labels: PropTypes.object,
};
