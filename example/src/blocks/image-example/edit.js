import { ToolbarGroup, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { BlockControls, useBlockProps } from '@wordpress/block-editor';

import { Image, MediaToolbar } from '@10up/block-components';

export function BlockEdit(props) {
    const {
        attributes,
        setAttributes
    } = props;

    const { imageId } = attributes;
    const blockProps = useBlockProps();

    const handleImageSelection = value => {
        setAttributes({imageId: value.id })
    };
    const removeImage = () => setAttributes({imageId: null});

    return (
        <>
            <BlockControls>
               <MediaToolbar id={imageId} onSelect={ handleImageSelection } isOptional={true} onRemove={removeImage} />
            </BlockControls>
            <div {...blockProps}>
                <h2>Hello World!</h2>
                <Image id={imageId} size="large" onSelect={handleImageSelection} className="example-image" />
            </div>
        </>
    )
}