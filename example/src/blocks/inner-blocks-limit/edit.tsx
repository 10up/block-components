import React from 'react';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useRenderAppenderWithLimit } from '@10up/block-components';

const TEMPLATE = [
	[
		'example/hello-world',
		{},
	],
];

export const BlockEdit = () => {
	const renderAppender = useRenderAppenderWithLimit(4);
	const blockProps = useBlockProps();

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			template: TEMPLATE,
			renderAppender,
		},
	);

	return (
		<div {...blockProps}>
			<div {...innerBlocksProps} />
		</div>
	);
};
