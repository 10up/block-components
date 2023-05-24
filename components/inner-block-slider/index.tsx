import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState, useRef } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
import { InnerBlocks, store as blockEditorStore } from '@wordpress/block-editor';
/** @jsx jsx */
// eslint-disable-next-line no-unused-vars
import { jsx, css } from '@emotion/react';
import { ChevronLeft, ChevronRight } from './icons';
import React from 'react';
import type { FC } from 'react';

type InnerBlockSliderProps = {
	slidesPerPage: number;
	parentBlockId: string;
	allowedBlock: string;
	template?: [[string]];
	slideHeight: string;
};

const InnerBlockSlider: FC<InnerBlockSliderProps> = ({
	parentBlockId,
	slidesPerPage,
	allowedBlock,
	template,
	slideHeight,
}) => {
	const [currentPage, setCurrentPage] = useState(1);

	let innerBlockTemplate = template;

	if (!innerBlockTemplate) {
		innerBlockTemplate = [[allowedBlock]];
	}

	const slideBlocks = useSelect(
		(select) => select(blockEditorStore).getBlock(parentBlockId).innerBlocks, [ parentBlockId ]
	);

	const { insertBlock } = useDispatch('core/editor');

	const slides = useRef<HTMLDivElement>();

	const slideCount = useRef();

	const totalPages = Math.ceil(slideBlocks.length / slidesPerPage);

	const totalWidth = (100 / slidesPerPage) * slideBlocks.length;

	const slideSlotWidth = 100 / slideBlocks.length;

	const moveOffset = slideSlotWidth * (currentPage - 1) * slidesPerPage;

	const addSlide = () => {
		const created = createBlock(allowedBlock);
		insertBlock(created, undefined, parentBlockId);
	};

	/**
	 * Reset page to 1 if slidesPerPage changes
	 */
	useEffect(() => {
		setCurrentPage(1);
	}, [slidesPerPage]);

	/**
	 * If a slide is added, switch to the new slide. If one is deleted, make sure we don't
	 * show a non-existent slide.
	 */
	useEffect(() => {
		if (!slideCount.current) {
			slideCount.current = slideBlocks.length;
		} else if (slideBlocks.length > slideCount.current) {
			// Slide added
			slideCount.current = slideBlocks.length;

			setCurrentPage(totalPages);
		} else if (slideBlocks.length < slideCount.current) {
			// Slide deleted
			slideCount.current = slideBlocks.length;

			if (currentPage > totalPages) {
				setCurrentPage(totalPages);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [slideBlocks.length]);

	const slidesCSS = css`
		/* stylelint-disable */
		width: ${totalWidth}%;
		transform: translate3d(-${moveOffset}%, 0px, 0px);
		${slideHeight ? `height: ${slideHeight};` : ''}

		.block-editor-block-list__layout > div {
			width: ${slideSlotWidth}%;
		}
	`;

	const prevEnabled = currentPage > 1;
	const nextEnabled = currentPage < totalPages;

	return (
		<div className="inner-block-slider">
			<div className="slides-outer">
				<div className="slides" css={slidesCSS} ref={slides}>
					<InnerBlocks
						allowedBlocks={[allowedBlock]}
						orientation="horizontal"
						template={innerBlockTemplate}
						__experimentalCaptureToolbars
					/>
				</div>
			</div>
			<div className="navigation">
				{[...Array(totalPages).keys()].map((i) => (
					<button
						aria-label={`Slide ${i + 1}`}
						onClick={() => {
							setCurrentPage(i + 1);
						}}
						type="button"
						key={i + 1}
						className={`dot ${currentPage === i + 1 ? 'current' : ''}`}
					/>
				))}

				<button
					aria-label="Add new slide"
					onClick={() => {
						addSlide();
					}}
					type="button"
					className="add"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img">
						<path d="M18 11.2h-5.2V6h-1.6v5.2H6v1.6h5.2V18h1.6v-5.2H18z" />
					</svg>
				</button>
			</div>
			<div className="controls">
				<div className={`prev-container ${!prevEnabled ? 'disable' : ''}`}>
					<button
						onClick={() => {
							if (prevEnabled) {
								setCurrentPage(currentPage - 1);
							}
						}}
						type="button"
					>
						<ChevronLeft />
					</button>
				</div>
				<div className={`next-container ${!nextEnabled ? 'disable' : ''}`}>
					<button
						onClick={() => {
							if (nextEnabled) {
								setCurrentPage(currentPage + 1);
							}
						}}
						type="button"
					>
						<ChevronRight />
					</button>
				</div>
			</div>
		</div>
	);
};

export { InnerBlockSlider };
