import { useEntityProp } from '@wordpress/core-data';
import { usePost } from '../use-post';

export const usePostMetaValue = (metaKey) => {
	const { postId, postType } = usePost();
	const [meta, setMeta] = useEntityProp('postType', postType, 'meta', postId);

	if (!meta || !metaKey || Object.prototype.hasOwnProperty.call(meta, metaKey)) {
		return [undefined, () => {}];
	}

	const metaValue = meta[metaKey];
	const setMetaValue = (newValue) => {
		setMeta({
			...meta,
			[metaKey]: newValue,
		});
	};

	return [metaValue, setMetaValue];
};
