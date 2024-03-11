import type { SVGProps } from 'react';

/**
 * Renders an SVG drag handle.
 *
 * @param {object} props The prop object.
 * @returns {*} React JSX
 */

export const DragHandle: React.FC<SVGProps<SVGSVGElement>> = (props) => (
	<svg
		style={{ marginRight: '10px', cursor: 'grab', flexShrink: 0 }}
		width="18"
		height="18"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 18 18"
		role="img"
		aria-hidden="true"
		focusable="false"
		{...props}
	>
		<path d="M5 4h2V2H5v2zm6-2v2h2V2h-2zm-6 8h2V8H5v2zm6 0h2V8h-2v2zm-6 6h2v-2H5v2zm6 0h2v-2h-2v2z" />
	</svg>
);
