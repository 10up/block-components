# Rich Text Field

A drop-in wrapper around `RichText` for use **outside** a block's `edit` context — for example, inside `InspectorControls` or a `Modal`.

`RichTextField` accepts all the same props as `RichText`, minus `isSelected` (managed internally). Please refer to the [official RichText documentation](https://developer.wordpress.org/block-editor/reference-guides/richtext/).

## Usage

```jsx
import { InspectorControls } from '@wordpress/block-editor';
import { Modal, PanelBody, Button } from '@wordpress/components';
import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { RichTextField } from '@10up/block-components';

function BlockEdit(props) {
    const { attributes, setAttributes } = props;
    const { sidebarNote, modalNote } = attributes;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <InspectorControls>
                <PanelBody title={__('Notes', 'your-textdomain')}>
                    <RichTextField
                        value={sidebarNote}
                        onChange={(value) => setAttributes({ sidebarNote: value })}
                        placeholder={__('Type and select to see the toolbar…', 'your-textdomain')}
                    />
                </PanelBody>
            </InspectorControls>

            <Button variant="primary" onClick={() => setIsOpen(true)}>
                {__('Open modal', 'your-textdomain')}
            </Button>

            {isOpen && (
                <Modal
                    title={__('Edit note', 'your-textdomain')}
                    onRequestClose={() => setIsOpen(false)}
                >
                    <RichTextField
                        value={modalNote}
                        onChange={(value) => setAttributes({ modalNote: value })}
                        allowedFormats={['core/bold', 'core/italic', 'core/link']}
                    />
                </Modal>
            )}
        </>
    );
}
```

## Props

| Name             | Type                       | Default | Description                                                       |
| ---------------- | -------------------------- | ------- | ----------------------------------------------------------------- |
| `value`          | `string`                   | —       | HTML string.                                                      |
| `onChange`       | `(value: string) => void`  | —       | Change handler.                                                   |
| `tagName`        | `string`                   | `'p'`   | Element rendered by `RichText`.                                   |
| `placeholder`    | `string`                   | —       | Placeholder text.                                                 |
| `allowedFormats` | `string[]`                 | —       | Allowed format names (e.g. `['core/bold', 'core/link']`).         |
| `className`      | `string`                   | —       | Class added to the wrapping element.                              |

All other `RichText` props are forwarded.

## Modal z-index note

When rendering `RichTextField` inside a `Modal`, the inline format toolbar may appear behind the modal. Add this CSS to lift it above the modal:

```css
body:has(.your-modal-className) .block-editor-rich-text__inline-format-toolbar {
    z-index: 1000001;
}
```
