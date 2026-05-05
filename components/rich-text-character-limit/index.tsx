import { useState, useEffect } from '@wordpress/element';
import type { FC } from 'react';
// @ts-ignore-next-line - The type definitions for the block-editor package are incomplete.
import { RichText, useBlockEditContext } from '@wordpress/block-editor';
import { create, remove, getTextContent, toHTMLString, RichTextValue } from '@wordpress/rich-text';
import { useFloating, autoUpdate } from '@floating-ui/react-dom';
import { Counter } from '../counter';

/*
 * Get Character Count
 *
 * get character count from `RichText` string.
 */
const getCharacterCount = (str: string): number => {
	if (!str) {
		return 0;
	}
	const richTextContent = create({ html: str });
	const textContent = getTextContent(richTextContent);
	return textContent.length;
};

interface RichTextCharacterLimitProps
	extends Omit<React.ComponentProps<typeof RichText>, 'value' | 'onChange'> {
	limit?: number;
	enforce?: boolean;
	value: string;
	onChange: (value: string) => void;
}

/*
 * Rich Text Character Limit
 *
 * extend `RichText` with the ability to add a character limit.
 */
const RichTextCharacterLimit: FC<RichTextCharacterLimitProps> = ({
	limit = 100,
	enforce = true,
	value,
	onChange,
	...richTextProps
}) => {
	const { isSelected } = useBlockEditContext();
	const {
		floatingStyles,
		refs: { setReference, setFloating },
	} = useFloating({
		open: isSelected,
		placement: 'bottom-end',
		strategy: 'fixed',
		whileElementsMounted: autoUpdate,
	});
	const [count, setCount] = useState<number>(0);
	const [richTextValue, setRichTextValue] = useState<string>(value);

	useEffect(() => {
		setCount(getCharacterCount(richTextValue));
	}, [richTextValue]);

	/*
	 * Sanitize
	 *
	 * remove characters if `enforce` is set to true.
	 */
	const sanitize = (str: string = value): RichTextValue => {
		const richTextContent = create({ html: str });
		const isOverLimit = getCharacterCount(str) > limit;

		if (isOverLimit && enforce) {
			// Workaround which fixes an issue with `<RichText>` not updating.
			setRichTextValue('');
			return remove(richTextContent, limit, getCharacterCount(str));
		}

		return richTextContent;
	};

	/*
	 * Rich Text On Change
	 *
	 * set rich text value and run `onChange` from initial props.
	 */
	const richTextOnChange = (str: string = value) => {
		const sanitized = toHTMLString({ value: sanitize(str) });
		setRichTextValue(sanitized);
		onChange(sanitized);
	};

	return (
		<>
			<RichText
				{...richTextProps}
				value={richTextValue}
				onChange={(str) => richTextOnChange(str)}
				ref={setReference as React.LegacyRef<keyof HTMLElementTagNameMap>}
			/>
			{isSelected && (
				<Counter
					count={count}
					limit={limit}
					ref={setFloating as React.LegacyRef<HTMLDivElement>}
					style={floatingStyles}
				/>
			)}
		</>
	);
};

export { RichTextCharacterLimit, getCharacterCount };
