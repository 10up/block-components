import { useSelect } from '@wordpress/data';

export const useSelectedTermsOfSavedPost = (taxonomyName, postId) => {
	return useSelect(
		(select) => {
			const { getEntityRecords, hasFinishedResolution } = select('core');

			const selectedTermsQuery = [
				'taxonomy',
				taxonomyName,
				{
					per_page: -1,
					post: postId,
				},
			];

			return [
				getEntityRecords(...selectedTermsQuery),
				hasFinishedResolution('getEntityRecords', selectedTermsQuery),
			];
		},
		[taxonomyName, postId],
	);
};
