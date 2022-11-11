import styled from '@emotion/styled';

export const InlineControlsStyleWrapper = styled('div')`
	line-height: 0;
	position: relative;

	&:hover,
	&:focus,
	&:focus-visible,
	&:focus-within {
		& .inline-controls {
			opacity: 1;
			pointer-events: all;
		}
	}

	& .inline-controls {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: row;
		gap: 5px;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
		opacity: 0;
		pointer-events: none;
		transition: opacity 250ms ease-out;

		&::after {
			content: '';
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.5);
			z-index: 0;
		}

		& > * {
			z-index: 1;
		}

		& .components-button {
			--button-text: #fff;
			--button-background: var(--wp-admin-theme-color);
			white-space: nowrap;
			background: var(--button-background);
			color: var(--button-text);
			text-decoration: none;
			text-shadow: none;
			outline: 1px solid transparent;
			width: 60px;
			height: 60px;
			border-radius: 50%;
			padding: 12px;
			border: 1px solid var(--button-background);

			& svg {
				width: 100%;
				height: 100%;
			}

			&:focus:not(.disabled) {
				outline: var(--wp-admin-theme-color);
			}

			&:hover:not(.disabled),
			&:active:not(.disabled) {
				--button-text: #fff;
				--button-background: var(--wp-admin-theme-color-darker-10);
			}

			&.remove-button {
				padding: 18px;
			}
		}
	}
`;
