import { create, getTextContent } from '@wordpress/rich-text';
import cx from 'classnames';

/**
 * Use Character Limit
 *
 * @param {string} content text content to be checked
 * @param {number} limit limit of characters
 *
 * @returns {useCharacterLimit}
 */
export function useCharacterLimit(content, limit) {
	const richTextContent = create({ html: content });
	const textContent = getTextContent(richTextContent);
	const count = textContent.length;
	const isOverLimit = count > limit;

	const Counter = () => (
		<div
			className={cx('tenup--block-components__character-count', {
				'is-over-limit': isOverLimit,
			})}
		>
			<span className="tenup--block-components__character-count__count">{count}</span> /{' '}
			<span className="tenup--block-components__character-count__limit">{limit}</span>
		</div>
	);

	return {
		count,
		limit,
		Counter,
		isOverLimit,
	};
}
