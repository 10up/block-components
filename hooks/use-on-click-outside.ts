import { useRefEffect } from '@wordpress/compose';

/**
 * useOnClickOutside
 *
 * Note: This hook is only intended to be used in the WordPress backend/block editor.
 *
 * @param {Function} onClickOutside callback that will get invoked when the user clicks outside of the target
 * @returns {object} ref to the target element
 */
export function useOnClickOutside(onClickOutside: (event: MouseEvent | TouchEvent) => void) {
	const ref = useRefEffect(
		(element) => {
			if (!element) {
				return () => {};
			}
			const listener = (event: MouseEvent | TouchEvent) => {
				// Do nothing if clicking ref's element or descendent elements
				if (!element || element.contains(event.target as HTMLElement)) {
					return;
				}
				onClickOutside(event);
			};

			const ownerDocument = element.ownerDocument || document;
			const isRenderedInsideIframe = ownerDocument !== document;

			const editorCanvasIframe =
				document.querySelector<HTMLIFrameElement>('[name="editor-canvas"]');
			const editorCanvasDocument = editorCanvasIframe?.contentDocument;

			ownerDocument.addEventListener('mousedown', listener);
			ownerDocument.addEventListener('touchstart', listener);

			// If the element is rendered inside an iframe, we need to listen to events on the parent document
			// as well to detect clicks outside the iframe.
			if (isRenderedInsideIframe) {
				document.addEventListener('mousedown', listener);
				document.addEventListener('touchstart', listener);

				// If the element is rendered outside the editor canvas iframe, we need to listen to events on the editor canvas
				// document as well to detect clicks inside the editor canvas.
			} else if (editorCanvasDocument) {
				editorCanvasDocument.addEventListener('mousedown', listener);
				editorCanvasDocument.addEventListener('touchstart', listener);
			}
			return () => {
				ownerDocument.removeEventListener('mousedown', listener);
				ownerDocument.removeEventListener('touchstart', listener);
				if (isRenderedInsideIframe) {
					document.removeEventListener('mousedown', listener);
					document.removeEventListener('touchstart', listener);
				} else if (editorCanvasDocument) {
					editorCanvasDocument.removeEventListener('mousedown', listener);
					editorCanvasDocument.removeEventListener('touchstart', listener);
				}
			};
		},
		[onClickOutside],
	);

	return ref;
}
