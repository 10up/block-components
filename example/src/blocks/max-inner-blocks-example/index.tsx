import React from 'react';
import { registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';

import { BlockEdit } from './edit';
import metadata from './block.json';

registerBlockType(metadata as Parameters<typeof registerBlockType>[0], {
	edit: BlockEdit,
	save: () => <InnerBlocks.Content />,
});
