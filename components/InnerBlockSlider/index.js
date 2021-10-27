import { useSelect, useDispatch } from '@wordpress/data';
import { useEffect, useState, useRef } from '@wordpress/element';
import { createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import PropTypes from 'prop-types';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { ChevronLeft, ChevronRight } from './icons';

const InnerBlockSlider = ({
	parentBlockId,
	slidesPerPage,
	allowedBlock,
	template,
	slideHeight,
}) => {
	const [currentSlide, setCurrentSlide] = useState(1);

	let innerBlockTemplate = template;

	if (!innerBlockTemplate) {
		innerBlockTemplate = [[allowedBlock]];
	}

	const slideBlocks = useSelect(
		(select) => select('core/block-editor').getBlock(parentBlockId).innerBlocks,
	);

	const { insertBlock } = useDispatch('core/editor');

	const slides = useRef();

	const slideCount = useRef();

	const totalPages = Math.floor(slideBlocks.length / slidesPerPage);

	const totalWidth = (100 / slidesPerPage) * slideBlocks.length;

	const slideSlotWidth = 100 / slideBlocks.length;

	const moveOffset = slideSlotWidth * (currentSlide - 1);

	const setPage = (page) => {
		const slideNumber = page * slidesPerPage;

		setCurrentSlide(slideNumber);
	};

	const getCurrentPage = () => {
		if (slidesPerPage === 1) {
			return currentSlide;
		}

		return Math.ceil(currentSlide / slidesPerPage);
	};

	const addSlide = () => {
		const created = createBlock(allowedBlock);
		insertBlock(created, undefined, parentBlockId);
	};

	/**
	 * Reset pag to 1 if slidesPerPage changes
	 */
	useEffect(() => {
		setCurrentSlide(1);
	}, [slidesPerPage]);

	useEffect(() => {
		// adjustHeights();
	}, [currentSlide]);

	/**
	 * If a slide is added, switch to the new slide. If one is deleted, make sure we don't
	 * show a non-existent slide.
	 */
	useEffect(() => {
		if (!slideCount.current) {
			slideCount.current = slideBlocks.length;
		} else if (slideBlocks.length > slideCount.current) {
			slideCount.current = slideBlocks.length;

			setCurrentSlide(slideBlocks.length);
		} else if (slideBlocks.length < slideCount.current) {
			slideCount.current = slideBlocks.length;

			if (currentSlide > slideBlocks.length) {
				setCurrentSlide(slideBlocks.length);
			}
		}
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

	const prevEnabled = currentSlide > 1;

	let nextEnabled = false;

	if (slidesPerPage === 1) {
		nextEnabled = currentSlide < slideBlocks.length;
	} else {
		nextEnabled = currentSlide <= slideBlocks.length - slidesPerPage;
	}

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
							setPage(i + 1);
						}}
						type="button"
						key={i + 1}
						className={`dot ${getCurrentPage() === i + 1 ? 'current' : ''}`}
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
								setCurrentSlide(currentSlide - 1);
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
								setCurrentSlide(currentSlide + 1);
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

InnerBlockSlider.defaultProps = {
	slidesPerPage: 1,
	template: null,
	slideHeight: null,
};

InnerBlockSlider.propTypes = {
	slidesPerPage: PropTypes.number,
	parentBlockId: PropTypes.string.isRequired,
	allowedBlock: PropTypes.string.isRequired,
	template: PropTypes.array,
	slideHeight: PropTypes.string,
};

export { InnerBlockSlider };
