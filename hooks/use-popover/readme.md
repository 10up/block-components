# `usePopover`

The `usePopover` hook is a simple utility allows you to easily add Popovers to any element.

## Usage

```js
import { usePopover } from '@10up/block-components';

function BlockEdit(props) {
    const { toggleProps, Popover } = usePopover();

    return (
        <>
            <button {...toggleProps}>
               Open Popover
            </button>
            <Popover>
                I'm rendered inside a Popover
            </Popover>
        </>
    );
}
```
