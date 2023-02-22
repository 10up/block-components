import { Popover } from '@wordpress/components';
import { useState, useCallback, useMemo } from '@wordpress/element';
import { useOnClickOutside } from '../use-on-click-outside';

export const usePopover = () => {
	// Use internal state instead of a ref to make sure that the component
	// re-renders when the popover's anchor updates.
	const [popoverAnchor, setPopoverAnchor] = useState();
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisible = useCallback(() => {
		setIsVisible((visible) => !visible);
	}, []);

	const toggleProps = {
		onClick: toggleVisible,
		'aria-expanded': isVisible,
		ref: setPopoverAnchor,
	};

	const ref = useOnClickOutside(() => setIsVisible(false));
	const PopoverComponent = useMemo(
		() =>
			// eslint-disable-next-line react/prop-types
			({ children }) => {
				if (!isVisible) {
					return null;
				}

				return (
					<Popover ref={ref} anchor={popoverAnchor} focusOnMount={false} animate={false}>
						<div style={{ padding: '16px', minWidth: '250px' }}>{children}</div>
					</Popover>
				);
			},
		[isVisible, popoverAnchor, ref],
	);

	return {
		setPopoverAnchor,
		toggleVisible,
		toggleProps,
		Popover: PopoverComponent,
	};
};
