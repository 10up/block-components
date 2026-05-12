/* eslint-disable @wordpress/no-unsafe-wp-apis */
import { useEffect, useRef, useState } from '@wordpress/element';
import { RichText } from '@wordpress/block-editor';
import {
	SlotFillProvider,
	// @ts-ignore-next-line - experimental component, no public types.
	__experimentalHStack as HStack,
} from '@wordpress/components';

interface RichTextFieldProps
	extends Omit<React.ComponentPropsWithoutRef<typeof RichText>, 'isSelected'> {
	className?: string;
}

/**
 * Drop-in `RichText` field for use outside a block's `edit` context
 * (e.g. inside `InspectorControls` or a `Modal`).
 *
 * Handles the three things `RichText` doesn't get for free outside a block:
 *
 * 1. Local `SlotFillProvider` so the format-toolbar fills (which `RichText`
 *    routes through `BlockControls`) resolve inside this field instead of
 *    being captured by the surrounding block's toolbar slot.
 * 2. `inlineToolbar` so the format toolbar renders as a popover near the caret.
 * 3. Manual `isSelected` state plus click-outside deselect, ignoring the
 *    inline toolbar and any popovers it spawns (e.g. the link URL input).
 */
export const RichTextField = ({
	tagName = 'p',
	className,
	...richTextProps
}: RichTextFieldProps) => {
	const [isSelected, setIsSelected] = useState(false);
	const ref = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!isSelected) {
			return undefined;
		}

		const doc = ref.current?.ownerDocument;
		if (!doc) {
			return undefined;
		}

		const handleMouseDown = (event: MouseEvent) => {
			const target = event.target as HTMLElement | null;
			if (ref.current?.contains(target)) {
				return;
			}
			if (target?.closest?.('.block-editor-rich-text__inline-format-toolbar')) {
				return;
			}
			if (target?.closest?.('.components-popover')) {
				return;
			}
			setIsSelected(false);
		};

		doc.addEventListener('mousedown', handleMouseDown);
		return () => doc.removeEventListener('mousedown', handleMouseDown);
	}, [isSelected]);

	return (
		<SlotFillProvider>
			<HStack
				ref={ref}
				className={className}
				onFocus={() => setIsSelected(true)}
				expanded
			>
				<RichText
					tagName={tagName}
					isSelected={isSelected}
					inlineToolbar
					{...richTextProps}
				/>
			</HStack>
		</SlotFillProvider>
	);
};
