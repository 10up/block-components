# ClipboardButton

This button component receives a string and copies it to the clipboard on click.

## Usage

```js
import { ClipboardButton } from '@10up/block-components';

const MyComponent = () => {
 return (
  <div>
   <ClipboardButton
    text="The string to be copied to the clipboard"
    onSuccess={ ()=> { console.log( 'String copied!' ) } }
    labels={{copy: 'Copy text', copied: 'Text copied!'}}
    disabled={false}
   >
  </div>
 );
};
```

## Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `text` | `string`    | `''`   | The text to be copied to the clipboard         |
| `onSuccess` | `function` | `undefined` | Callback function that runs after text is copied to the clipboard |
| `labels` | `object` | `{}` | Prop to assign labels to the button before and after copying the text. Set the properties `copy` and `copied` on the object to replace the default "Copy" and "Copied" text. |
| `disabled` | `bool` | `false` | Prop to enable/disable the button |
