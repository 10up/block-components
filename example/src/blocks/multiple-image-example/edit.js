import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';

import { Image } from '@10up/block-components';

export function BlockEdit(props) {
    const {
        attributes,
        setAttributes
    } = props;

    const { image1, image2, image3, focalPoint1, focalPoint2, focalPoint3 } = attributes;
    const blockProps = useBlockProps();

    return (
        <div {...blockProps}>

            <Image id={image1} size="large" onSelect={(image) => setAttributes({image1: image.id })} className="example-image" focalPoint={focalPoint1} onChangeFocalPoint={(value) => setAttributes({focalPoint1: value})} hasInlineControls={true} onRemove={() => setAttributes({image1: null})} isOptional={false} />

            <Image id={image2} size="large" onSelect={(image) => setAttributes({image2: image.id })} className="example-image" focalPoint={focalPoint2} onChangeFocalPoint={(value) => setAttributes({focalPoint2: value})} hasInlineControls={true} onRemove={() => setAttributes({image2: null})} />

            <Image id={image3} size="large" onSelect={(image) => setAttributes({image3: image.id })} className="example-image" focalPoint={focalPoint3} onChangeFocalPoint={(value) => setAttributes({focalPoint3: value})} hasInlineControls={true} onRemove={() => setAttributes({image3: null})} />
        </div>
    )
}