# ColorSetting

A component that lets you add a `label`, `help` text and all the existing options from the core `ColorPalette` component. This component can be used by any other Bock Component or a Block. This component calls the `onChange` callback with the value of the selected color and does not add/update any CSS classes.

## Usage

```js
import { ColorSetting } from '@10up/block-components';

function MyComponent( props ) {

    return (
        <ColorSetting
            label={ __( 'Color Setting - Label', NAMESPACE ) }
            help={ __( 'Color Setting - Help Text', NAMESPACE ) }
            colors={ colors }
            value={ color }
            onChange={ ( color ) => setColor( color ) }
        />
    )
}
```

## Props

| Name             | Type       | Default   | isRequired     | Description                                                            |
| ---------------- | ---------- | ---------- | --------------------- | ---------------------------------------------------------------------- |
| `label`   | `string` | `''`            | `No` |  If this property is added, a label will be generated using label property as the content. |
| `hideLabelFromVision`          | `bool`   | `false`                   | `No` | If true, the label will only be visible to screen readers.                                  |
| `help`           | `string`   | `''`               | `No` | If this property is added, a help text will be generated using help property as the content.                                 |
| `className`    | `string`   | `''`                   | `No` | If no className is passed only components-base-control is used.                      |
| `disableCustomColors`      | `bool`    | `false` | `No` | Whether to allow custom color or not.                      |
| `value`      | `string`    | `''` | `No` | Currently active value. |
| `clearable`           | `bool`   | `true`               | `No` | Whether the palette should have a clearing button or not.
| `colors`           | `array`   | `[]`               | `Yes` | Array with the colors to be shown.
| `onChange`           | `function`   | `undefined`               | `Yes` |  Callback called when a color is selected.
