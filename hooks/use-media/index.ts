import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import type { Attachment } from '@wordpress/core-data';

export function useMedia(id: number) {
	return useSelect(
		(select) => {
			// @ts-ignore-next-line - The type definitions for the core store are incomplete.
			const { getEntityRecord, isResolving, hasFinishedResolution } = select(coreStore);

			const mediaParameters = ['postType', 'attachment', id, { context: 'view' }] as const;

			return {
				media: getEntityRecord(...mediaParameters),
				isResolvingMedia: isResolving('getEntityRecord', mediaParameters),
				hasResolvedMedia: hasFinishedResolution('getEntityRecord', mediaParameters),
			};
		},
		[id],
	) as {
		media: Attachment | undefined;
		isResolvingMedia: boolean;
		hasResolvedMedia: boolean;
	};
}
