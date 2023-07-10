import { useCopyToClipboard } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import React from 'react';
import type { FC } from 'react';

type ClipboardButtonProps = {
	text: string;
	disabled: boolean;
	onSuccess: Function;
	labels: {
		copy?: string;
		copied?: string;
	};
};

export const ClipboardButton: FC<ClipboardButtonProps> = (props) => {
	const { text, disabled, onSuccess, labels } = props;
	const [hasCopied, setHasCopied] = useState(false);
	const copy = labels.copy || __('Copy');
	const copied = labels.copied || __('Copied');

	useEffect(() => {
		let timerId: number;

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
