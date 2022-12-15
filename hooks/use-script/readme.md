# `useScript`

The `useScript` hook allows you to load dynamic script tags on the page from within your react application. This is useful for things like form / video embeds where the script url may include a specific identifier.

## Usage

```js
function BlockEdit( props ) {
    const { attributes } = props;
    const { formId } = attributes;

    const { hasLoaded, scriptElement } = useScript( `https://example.com/${formId}` );

    return (
        ...
    );
}
```
