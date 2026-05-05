import React from 'react';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';

import { ColorSetting } from '@10up/block-components';

export const BlockEdit = (props) => {
	const {
		attributes: { color },
		setAttributes
	} = props;

	const blockProps = useBlockProps();

	const colors = [
		{ name: 'red', color: '#f00' },
		{ name: 'white', color: '#fff' },
		{ name: 'blue', color: '#00f' },
	];
	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Post Picker', 'example')}>
					<ColorSetting
						label={__('Color Setting - Label', 'example')}
						help={__('Color Setting - Help Text', 'example')}
						colors={colors}
						value={color}
						onChange={(val) => setAttributes({ color: val })}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...blockProps}>
				<ColorSetting
					label={__('Color Setting - Label', 'example')}
					help={__('Color Setting - Help Text', 'example')}
					colors={colors}
					value={color}
					onChange={(val) => setAttributes({ color: val })}
				/>
			</div>
		</>
	)
}