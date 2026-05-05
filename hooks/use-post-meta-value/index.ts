import { useEntityProp } from '@wordpress/core-data';
import { usePost } from '../use-post';

export const usePostMetaValue = <TMeta>(
	metaKey: string,
): [TMeta | undefined, (value: TMeta) => void] => {
	const { postId, postType } = usePost();
	const [meta, setMeta] = useEntityProp('postType', postType, 'meta', postId as string);

	if (!meta || !metaKey || !Object.prototype.hasOwnProperty.call(meta, metaKey)) {
		return [undefined, () => {}];
	}

	const metaValue = meta[metaKey];
	const setMetaValue = (newValue: TMeta) => {
		setMeta({
			...meta,
			[metaKey]: newValue,
		});
	};

	return [metaValue, setMetaValue] as const;
};
