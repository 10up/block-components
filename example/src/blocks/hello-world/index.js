import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Placeholder } from '@wordpress/components';
import { ContentPicker } from '@10up/block-components';
import metadata from './block.json';

registerBlockType( metadata, {
    edit: (props) => {
        const {
            className,
            attributes: { selectedPost },
            setAttributes
        } = props;

        function handlePostSelection( post ) {
            setAttributes( { selectedPost: post } )
        }

        return (
            <>
            <InspectorControls>
                <PanelBody title={ __( 'Post Picker', 'example' ) }>
                    <ContentPicker 
                        label={ __( 'Select a Post or Page', 'example' ) }
                        onPickChange={ handlePostSelection }
                        content={ selectedPost }
                        maxContentItems={5}
                        isOrderable={true}
                    />
                </PanelBody>
            </InspectorControls>
            <Placeholder label={ __( 'Post Picker', 'example' ) } instructions={ __( 'Use the text field so search for a post', 'example') } className={ className }>
                <ContentPicker 
                    postTypes={ [ 'page', 'post' ] }
                    label={ __( 'Select a Post or Page', 'example' ) }
                    onPickChange={ handlePostSelection }
                    content={ selectedPost }
                    perPage={3}
                    maxContentItems={ 5 }
                    isOrderable={ true }
                />
            </Placeholder>
            </>
        )
    },
    save: () => null
} );
