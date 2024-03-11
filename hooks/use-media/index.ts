import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';
import type { Attachment } from '@wordpress/core-data';

export function useMedia(id: number) {
	return useSelect(
		(select) => {
			const { getMedia, isResolving, hasFinishedResolution } = select(coreStore);

			const mediaParameters = [id, { context: 'view' }];

			return {
				media: ( getMedia(...mediaParameters) ) as Attachment | undefined,
				isResolvingMedia: ( isResolving('getMedia', mediaParameters) ) as boolean,
				hasResolvedMedia: ( hasFinishedResolution('getMedia', mediaParameters) ) as boolean,
			};
		},
		[id],
	);
}
