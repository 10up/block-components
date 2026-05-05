import React from 'react';
import { __ } from '@wordpress/i18n';
import { BlockControls, useBlockProps } from '@wordpress/block-editor';

import { Image, MediaToolbar } from '@10up/block-components';

export function BlockEdit(props) {
    const {
        attributes,
        setAttributes
    } = props;

    const { imageId, focalPoint } = attributes;
    const blockProps = useBlockProps();

    const handleImageSelection = value => {
        setAttributes({imageId: value.id })
    };
    const removeImage = () => setAttributes({imageId: null});

	const handleFocalPointChange = value => {
		setAttributes({focalPoint: value})
	};

    return (
        <>
            <BlockControls>
                <MediaToolbar
                    id={imageId}
                    onSelect={ handleImageSelection }
                    isOptional={true}
                    onRemove={removeImage}
                    labels={{
                        replace: __('Replace your gif'),
                        remove: __('Remove the gif'),
                        add: __('Add a gif')
                    }}
                />
            </BlockControls>
            <div {...blockProps}>
                <h2>Hello World!</h2>
                <Image
                    id={imageId}
                    size="large"
                    onSelect={handleImageSelection}
                    className="example-image"
                    allowedTypes={['image/gif']}
                    labels={{
                        title: __('Select a gif image'),
                        instructions: __('Upload a gif or pick one from your media library.')
                    }}
                />
            </div>
        </>
    )
}