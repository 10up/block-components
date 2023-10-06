import styled from '@emotion/styled';

export const InlineControlsStyleWrapper = styled('figure')`
	line-height: 0;
	position: relative;
	margin: 0;

	& img {
		max-width: 100%;
		min-width: 100%;
		min-height: 100%;
	}

	& *,
	*::before,
	*::after {
		box-sizing: border-box;
		line-height: initial;
	}

	&:hover,
	&:focus,
	&:focus-visible,
	&:focus-within {
		outline: 1px solid #1e1e1e;
		outline-offset: -1px;

		& .inline-controls {
			opacity: 1;
			pointer-events: all;
		}
	}

	& .inline-controls-sticky-wrapper {
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
	}

	& .inline-controls {
		border: 1px solid #1e1e1e;
		border-radius: 2px;
		display: grid;
		gap: 1px;
		grid-auto-flow: column;
		grid-template-columns: repeat(auto-fit, minmax(36px, 1fr));
		margin: 10px 10px 10px auto;
		opacity: 0;
		overflow: hidden;
		pointer-events: none;
		position: sticky;
		top: 10px;
		transition: opacity 250ms ease-out;
		width: max-content;

		& > div:not(:last-child) {
			border-right: 1px solid #1e1e1e;
			display: block;
			min-width: max-content;
			position: relative;
		}

		& .components-button {
			--button-text: inherit;
			--button-background: var(--wp--preset--color--white);
			background: var(--button-background);
			border-radius: 0;
			color: var(--button-text);
			height: 46px;
			outline: 1px solid transparent;
			padding: 6px 12px;
			text-decoration: none;
			white-space: nowrap;

			&:focus:not(.disabled) {
				outline: var(--wp-admin-theme-color);
			}

			&:hover:not(.disabled),
			&:active:not(.disabled) {
				--button-text: var(--wp-admin-theme-color);
			}
		}
	}
`;
