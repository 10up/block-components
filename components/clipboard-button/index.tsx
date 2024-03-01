import { useCopyToClipboard } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

interface ClipboardButtonProps {
	/**
	 * The text to copy to the clipboard.
	 */
	text: string;

	/**
	 * Boolean to disable the button.
	 */
	disabled: boolean;

	/**
	 * Function to run when the text is successfully copied.
	 */
	onSuccess: Function;

	/**
	 * Labels for the button.
	 */
	labels: ButtonLabels;
}

interface ButtonLabels {
	/**
	 * Label for the button when it's ready to copy.
	 */
	copy?: string;

	/**
	 * Label for the button when the text has been copied.
	 */
	copied?: string;
}

export const ClipboardButton: React.FC<ClipboardButtonProps> = ({
	text,
	disabled,
	onSuccess,
	labels,
}) => {
	const [hasCopied, setHasCopied] = useState(false);
	const copy = labels.copy ? labels.copy : __('Copy');
	const copied = labels.copied ? labels.copied : __('Copied');

	useEffect(() => {
		let timerId: undefined | number;

		if (hasCopied) {
			timerId = setTimeout(() => {
				setHasCopied(false);
			}, 3000);
		}

		return () => {
			if (timerId) {
				clearTimeout(timerId);
			}
		};
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
