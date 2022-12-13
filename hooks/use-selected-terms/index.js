import { usePost } from '../use-post';
import { useIsSupportedTaxonomy } from '../use-is-supported-taxonomy';
import { useAllTerms } from '../use-all-terms';
import { useSelectedTermIds } from '../use-selected-term-ids';
import { useSelectedTermsOfSavedPost } from '../use-selected-terms-of-saved-post';

export const useSelectedTerms = (taxonomyName) => {
	const { postId, postType, isEditable } = usePost();
	const [isSupportedTaxonomy, hasResolvedIsSupportedTaxonomy] = useIsSupportedTaxonomy(
		postType,
		taxonomyName,
	);
	const [selectedTermIds, hasResolvedSelectedTermIds] = useSelectedTermIds(taxonomyName);
	const [terms, hasResolvedTerms] = useAllTerms(taxonomyName);
	const [selectedTermsOfSavedPost, hasResolvedSelectedTermsOfSavedPost] =
		useSelectedTermsOfSavedPost(taxonomyName, postId);

	if (!hasResolvedIsSupportedTaxonomy) {
		return [[], false];
	}

	if (!isSupportedTaxonomy && hasResolvedIsSupportedTaxonomy) {
		// eslint-disable-next-line no-console
		console.error(
			`The taxonomy "${taxonomyName}" is not supported for the post type "${postType}". Please use a supported taxonomy.`,
		);
		return [[], true];
	}

	if (
		(!isEditable && !hasResolvedSelectedTermsOfSavedPost) ||
		(isEditable && (!hasResolvedTerms || !hasResolvedSelectedTermIds))
	) {
		return [[], false];
	}

	if (!isEditable && hasResolvedSelectedTermsOfSavedPost) {
		return [selectedTermsOfSavedPost, hasResolvedSelectedTermsOfSavedPost];
	}

	return [
		terms.filter((term) => selectedTermIds?.includes(term.id)),
		hasResolvedTerms && hasResolvedSelectedTermIds,
	];
};
