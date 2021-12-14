import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';

import './register-icons';
import { BlockEdit } from './edit';
import metadata from './block.json';

registerBlockType( metadata, {
    edit: BlockEdit,
    save: () => null
} );
