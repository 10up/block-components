# `useIsPluginActive`

The `useIsPluginActive` hook is a simple utility that returns whether or not a given plugin is activated.

## Usage

```js
import { useIsPluginActive } from '@10up/block-components';

function BlockEdit(props) {
    const [isYoastSeoActive, hasResolvedIsPluginActive] = useIsPluginActive('wordpress-seo/wp-seo');

    if ( ! hasResolvedIsPluginActive ) {
        return <Spinner />
    }

    return (
        ...
    );
}
```
