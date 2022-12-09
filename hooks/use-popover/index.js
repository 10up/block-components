import { Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { useOnClickOutside } from '../use-on-click-outside';

export const usePopover = () => {
	// Use internal state instead of a ref to make sure that the component
	// re-renders when the popover's anchor updates.
	const [popoverAnchor, setPopoverAnchor] = useState();
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisible = () => {
		setIsVisible(!isVisible);
	};

	const toggleProps = {
		onClick: toggleVisible,
		'aria-expanded': isVisible,
		ref: setPopoverAnchor,
	};

	const ref = useOnClickOutside(() => setIsVisible(false));

	return {
		setPopoverAnchor,
		toggleVisible,
		toggleProps,
		// eslint-disable-next-line react/prop-types
		Popover: ({ children }) =>
			isVisible ? (
				<Popover ref={ref} anchor={popoverAnchor} focusOnMount={false} animate={false}>
					<div style={{ padding: '16px' }}>{children}</div>
				</Popover>
			) : null,
	};
};
