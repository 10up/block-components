import { useEffect, useRef } from '@wordpress/element';

/**
 * useOnClickOutside
 *
 * @param {Function} onClickOutside callback that will get invoked when the user clicks outside of the target
 * @returns {object} ref to the target element
 */
export function useOnClickOutside<TElementType extends HTMLElement>(onClickOutside: (event: TouchEvent | MouseEvent) => void) {
	const ref = useRef<TElementType>(null);
	useEffect(
		() => {
			const listener = (event: MouseEvent | TouchEvent) => {
				// Do nothing if clicking ref's element or descendent elements
				if (!ref.current || ref.current.contains(event.target as Node)) {
					return;
				}
				onClickOutside(event);
			};
			document.addEventListener('mousedown', listener);
			document.addEventListener('touchstart', listener);
			return () => {
				document.removeEventListener('mousedown', listener);
				document.removeEventListener('touchstart', listener);
			};
		},
		// Add ref and handler to effect dependencies
		// It's worth noting that because passed in handler is a new function on every
		// render that will cause this effect callback/cleanup to run every render.
		// It's not a big deal but to optimize you can wrap handler in useCallback before
		// passing it into this hook.
		[ref, onClickOutside],
	);

	return ref;
}
