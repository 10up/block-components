import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export function useMedia(id) {
	return useSelect(
		(select) => {
			// @ts-ignore
			const { getMedia, isResolving, hasFinishedResolution } = select(coreStore);

			const mediaParameters = [id, { context: 'view' }];

			return {
				media: getMedia(...mediaParameters),
				isResolvingMedia: isResolving('getMedia', mediaParameters),
				hasResolvedMedia: hasFinishedResolution('getMedia', mediaParameters),
			};
		},
		[id],
	);
}
