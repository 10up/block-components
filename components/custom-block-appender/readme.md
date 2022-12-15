# CustomBlockAppender

This component is passed to an `InnerBlocks` instance to as it's `renderAppender` to provide a customized button that opens the Block Inserter.

## Usage

```js
import { CustomBlockAppender } from '@10up/block-components';
const MyComponent = ({clientId}) => {
 <InnerBlocks
  renderAppender={() => (
   <CustomBlockAppender
    className="custom-classname"
    rootClientId={clientId}
    icon="heavy-plus"
    isTertiary
    showTooltip
    label={__('Insert Accordion content', '10up-block-library')}
   />
  )}
 />
}
```

## Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `rootClientId` | `string`    | `''`   | Client it of the block         |
| `buttonText` | `string` | `''` | Text to display in the button |
| `icon` | `string` | `'plus'` | Icon to display.  |
| `..buttonProps` | `object` | `null'` | Any other props passed are spread onto the internal Button component. |
