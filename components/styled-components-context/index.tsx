import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useRefEffect, useInstanceId } from '@wordpress/compose';
import { useState } from '@wordpress/element';

interface StyledComponentContextProps {
	/**
	 * Children.
	 */
	children: React.ReactNode;

	/**
	 * Cache key.
	 */
	cacheKey: string;
}

export const StyledComponentContext: React.FC<StyledComponentContextProps> = ({
	children,
	cacheKey,
}) => {
	const fallbackKey = `${useInstanceId(StyledComponentContext)}`;

	const defaultCache = createCache({
		key: cacheKey || fallbackKey,
	});

	const [cache, setCache] = useState(defaultCache);
	const nodeRef = useRefEffect(
		(node) => {
			if (node) {
				setCache(
					createCache({
						key: cacheKey || fallbackKey,
						container: node,
					}),
				);
			}
			return () => {
				setCache(defaultCache);
			};
		},
		[cacheKey, fallbackKey],
	);

	return (
		<>
			<span ref={nodeRef} style={{ display: 'none' }} />
			<CacheProvider value={cache}>{children}</CacheProvider>
		</>
	);
};
