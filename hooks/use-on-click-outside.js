import { useEffect, useRef } from '@wordpress/element';

/**
 * useOnClickOutside
 *
 * @param {Function} onClickOutside callback that will get invoked when the user clicks outside of the target
 * @returns {React.RefObject<HTMLElement>}
 */
export function useOnClickOutside(onClickOutside) {
	const ref = useRef();
	useEffect(
		() => {
			const listener = (event) => {
				// Do nothing if clicking ref's element or descendent elements
				if (!ref.current || ref.current.contains(event.target)) {
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
