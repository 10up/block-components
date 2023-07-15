# InnerBlockSlider `DEPRECATED`

> **Warning**
> The `InnerBlockSlider` is deprecated since version 1.15.12 and will be removed from 10up Block Components in version 1.16. Please use the `useInnerBlocksProps` hook to render the inner blocks and then use the same JS library that powers the slider on the frontend in the editor instead.

This component creates a horizontal slider with inner blocks inside of it.

## Usage

```js
import { InnerBlockSlider } from '@10up/block-components';
const MyComponent = ({clientId}) => {
 <InnerBlockSlider
  allowedBlock="core/cover"
  slidesPerPage={1}
  parentBlockId={clientId}
 />
}
```

## Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `allowedBlock` | `string`    | `''`   | Block types to be allowed inside the slider         |
| `slidesPerPage` | `integer` | `1` | Number of slides to show per page |
| `parentBlockId` | `string` | `''` | Client ID of parent block. This is required.  |
