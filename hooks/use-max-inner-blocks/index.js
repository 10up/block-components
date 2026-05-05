/**
 * WordPress dependencies
 */
import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useRef } from '@wordpress/element';
import { Icon, info } from '@wordpress/icons';

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
 *
 * @param {object}                               options                 Hook options.
 * @param {string}                               options.clientId        Parent block's clientId.
 * @param {number}                               options.max             Maximum allowed direct innerBlocks.
 * @param {string}                               options.message         Notice message.
 * @param {('warning'|'info'|'success'|'error')} [options.status]        Notice status. Defaults to `'warning'`.
 * @param {object}                               [options.noticeOptions] Forwarded as the third argument to `createNotice`.
 * Any key set here overrides the hook's defaults (`id`, `type: 'snackbar'`, `icon`, `isDismissible: true`). See
 * https://github.com/WordPress/gutenberg/blob/trunk/packages/notices/src/store/actions.ts for the full list of supported keys.
 * @returns {void}
 */
export const useMaxInnerBlocks = ({
	clientId,
	max,
	message,
	status = 'warning',
	noticeOptions = {},
}) => {
	const innerBlocks = useSelect(
		(select) => select('core/block-editor').getBlock(clientId)?.innerBlocks ?? [],
		[clientId],
	);

	const { removeBlocks } = useDispatch('core/block-editor');
	const { createNotice } = useDispatch('core/notices');

	const prevIdsRef = useRef([]);

	useEffect(() => {
		const currentIds = innerBlocks.map((block) => block.clientId);

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
