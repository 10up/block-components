import { useEffect, useRef, useState } from '@wordpress/element';

/**
 * Add a script tag to body
 */
export const useScript = (scriptSource: string) => {
	const scriptElement = useRef<HTMLScriptElement>();
	const [scriptLoaded, setScriptLoaded] = useState(false);

	useEffect(() => {
		if (window) {
			scriptElement.current = document.createElement('script');
			scriptElement.current.src = scriptSource;
			scriptElement.current.async = true;
			scriptElement.current.type = 'text/javascript';
			scriptElement.current.addEventListener(
				'load',
				() => {
					setScriptLoaded(true);
				},
				{ once: true, passive: true },
			);

			document.body.appendChild(scriptElement.current);
		}
		return () => {
			scriptElement.current?.remove();
		};
	}, [scriptSource]);

	return { hasLoaded: scriptLoaded, scriptElement: scriptElement.current };
};
