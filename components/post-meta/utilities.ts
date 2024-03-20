// Checks whether character is Uppercase.
// Crude version. Checks only A-Z.
function isCaps(char: string) {
	if (char.match(/[A-Z]/)) return true;
	return false;
}

// Checks whether character is digit.
function isDigit(char: string) {
	if (char.match(/[0-9]/)) return true;
	return false;
}

export function toKebab(string: string) {
	return string
		.split('')
		.map((letter, index) => {
			const previousLetter = string[index - 1] || '';
			const currentLetter = letter;

			if (isDigit(currentLetter) && !isDigit(previousLetter)) {
				return `-${currentLetter}`;
			}

			if (!isCaps(currentLetter)) return currentLetter;

			if (previousLetter === '') {
				return `${currentLetter.toLowerCase()}`;
			}

			if (isCaps(previousLetter)) {
				return `${currentLetter.toLowerCase()}`;
			}

			return `-${currentLetter.toLowerCase()}`;
		})
		.join('')
		.trim()
		.replace(/[-_\s]+/g, '-');
}

export function toSentence(string: string) {
	const interim = toKebab(string).replace(/-/g, ' ');
	return interim.slice(0, 1).toUpperCase() + interim.slice(1);
}
