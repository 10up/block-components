import React from 'react';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import { Icon, info } from '@wordpress/icons';

type NoticeStatus = 'warning' | 'info' | 'success' | 'error';

interface UseMaxInnerBlocksOptions {
	clientId: string;
	max: number;
	message: string;
	status?: NoticeStatus;
	noticeOptions?: Record<string, unknown>;
}

/**
 * Default icon. Uses `currentColor` so it adapts to the dark snackbar background.
 */
const defaultIcon = <Icon icon={info} fill="currentColor" />;

/**
 * Enforce an upper bound on a block's direct innerBlocks.
 *
 * Identifies over-limit additions by diffing clientIds against the prior
 * snapshot, so existing (potentially filled) children are never removed —
 * even if a duplicate lands between them (e.g. [A, A-copy, B] → remove A-copy,
 * keep [A, B]). Fires a notice whenever an extra is removed.
 */
export const useMaxInnerBlocks = ({
	clientId,
	max,
	message,
	status = 'warning',
	noticeOptions = {},
}: UseMaxInnerBlocksOptions): void => {
	const innerBlocks = useSelect(
		(select) => {
			// @ts-expect-error - TS doesn't know about the block editor store
			return select(blockEditorStore).getBlock(clientId)?.innerBlocks ?? [];
		},
		[clientId],
	);

	const { removeBlocks } = useDispatch(blockEditorStore);
	const { createNotice } = useDispatch('core/notices');

	const prevIdsRef = useRef<string[]>([]);

	useEffect(() => {
		const currentIds: string[] = innerBlocks.map(
			(block: { clientId: string }) => block.clientId,
		);

		if (innerBlocks.length > max) {
			const newIds = currentIds.filter((id) => !prevIdsRef.current.includes(id));
			if (newIds.length > 0) {
				removeBlocks(newIds, false);
				createNotice(status, message, {
					id: `max-inner-blocks-${clientId}`,
					type: 'snackbar',
					icon: defaultIcon,
					isDismissible: true,
					...noticeOptions,
				});
				return;
			}
		}

		prevIdsRef.current = currentIds;
	}, [innerBlocks, max, message, status, noticeOptions, clientId, removeBlocks, createNotice]);
};
