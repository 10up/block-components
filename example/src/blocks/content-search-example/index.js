import { useState } from 'react';
import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Placeholder, Notice, CheckboxControl } from '@wordpress/components';

import { ContentSearch } from '@10up/block-components';

const NAMESPACE = 'example';

registerBlockType( `${ NAMESPACE }/content-search`, {
    title: __( 'Post Searcher', NAMESPACE ),
    description: __( 'Example Block to show the Content Search in usage', NAMESPACE ),
    icon: 'smiley',
    category: 'common',
    example: {},
    supports: {
        html: false
    },
    attributes: {
        selectedPost: {
            type: 'array'
        }
    },
    transforms: {},
    variations: [],
    edit: (props) => {
        const [fetchOnFocus, setFetchOnFocus] = useState(false);

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
                <PanelBody title={ __( 'Post Searcher', NAMESPACE ) }>
                    <ContentSearch
                        label={ __( 'Select a Post or Page', NAMESPACE ) }
                        contentTypes={ [ 'page', 'post' ] }
                        onSelectItem={ handlePostSelection }
                        fetchOnFocus={fetchOnFocus}
                    />
                </PanelBody>
            </InspectorControls>
            <Placeholder label={ __( 'Post Searcher', NAMESPACE ) } instructions={ __( 'Use the text field to search for a post', NAMESPACE) } className={ className }>
                <ContentSearch
                    label={ __( 'Select a Post or Page', NAMESPACE ) }
                    contentTypes={ [ 'page', 'post' ] }
                    onSelectItem={ handlePostSelection }
                    fetchOnFocus={fetchOnFocus}
                />
                <div style={{ width: '100%' }}>
                    <CheckboxControl
                        label="Enable fetch on focus"
                        checked={fetchOnFocus}
                        onChange={setFetchOnFocus}
                    />
                </div>
            </Placeholder>
            {selectedPost && (
                <Notice status="info" isDismissible={false} >
                    <p>{selectedPost.title}</p>
                </Notice>
            )}
            </>
        )
    },
    save: () => null
} );
