# InnerBlockSlider

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
