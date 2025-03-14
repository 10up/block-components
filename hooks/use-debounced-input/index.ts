import { useEffect, useState } from '@wordpress/element';
import { useDebounce } from '@wordpress/compose';

type DebouncedInputOptions = {
	delay: number;
};

/**
 * Helper hook for input fields that need to debounce the value before using it.
 *
 * @param {string}                defaultValue The default value to use.
 * @param {DebouncedInputOptions} options      Set of options for useDebounce, 350ms is the default
 *
 * @returns The input value, the setter and the debounced input value.
 */
export function useDebouncedInput(
	defaultValue: string = '',
	options: DebouncedInputOptions = { delay: 500 },
): [string, (value: string) => void, string] {
	const [input, setInput] = useState<string>(defaultValue);
	const [debouncedInput, setDebouncedState] = useState(defaultValue);
	const { delay } = options;
	const setDebouncedInput = useDebounce(setDebouncedState, delay);

	useEffect(() => {
		setDebouncedInput(input);
	}, [input, setDebouncedInput]);

	return [input, setInput, debouncedInput];
}
