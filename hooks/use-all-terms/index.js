import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

export const useAllTerms = (taxonomyName) => {
	return useSelect(
		(select) => {
			const { getEntityRecords, hasFinishedResolution } = select(coreStore);

			const termsSelector = [
				'taxonomy',
				taxonomyName,
				{
					per_page: -1,
					context: 'view',
				},
			];

			const terms = getEntityRecords(...termsSelector);

			const hasResolvedTerms = hasFinishedResolution('getEntityRecords', termsSelector);

			return [terms, hasResolvedTerms];
		},
		[taxonomyName],
	);
};
