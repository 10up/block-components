# `useMaxInnerBlocks`

Enforce an upper bound on a block's direct `innerBlocks`. When an over-limit addition lands, the newest extras are removed and a notice is fired. Existing children are preserved even when a duplicate is pasted between them.

## Usage

```js
import { useMaxInnerBlocks } from '@10up/block-components';
import { __ } from '@wordpress/i18n';

function BlockEdit({ clientId }) {
    useMaxInnerBlocks({
        clientId,
        max: 3,
        message: __('You can only add up to 3 cards.', 'your-textdomain'),
    });

    return (
        // ...
    );
}
```

## Options

| Prop | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `clientId` | `string` | yes | — | Parent block's clientId. |
| `max` | `number` | yes | — | Maximum allowed direct `innerBlocks`. |
| `message` | `string` | yes | — | Notice message. |
| `status` | `'warning' \| 'info' \| 'success' \| 'error'` | no | `'warning'` | Notice status. |
| `noticeOptions` | `object` | no | `{}` | Forwarded to `createNotice`'s third argument. Any key here overrides the hook's defaults (`id`, `type: 'snackbar'`, `icon`, `isDismissible: true`). |

## Customizing the notice

Anything `createNotice` accepts can be passed via `noticeOptions`. The full list of supported keys is documented in the [`@wordpress/notices` store actions](https://github.com/WordPress/gutenberg/blob/trunk/packages/notices/src/store/actions.ts) — including `actions`, `type`, `icon`, `isDismissible`, `explicitDismiss`, `onDismiss`, `speak`, and `context`.

### Custom icon

The default icon is `info` from [`@wordpress/icons`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-icons/). Override it with any other icon (or any React element). When using `Icon`, pass `fill="currentColor"` so the icon picks up the surrounding notice color (snackbars are dark):

```js
import { useMaxInnerBlocks } from '@10up/block-components';
import { Icon, lock } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

function BlockEdit({ clientId }) {
    useMaxInnerBlocks({
        clientId,
        max: 3,
        message: __('You can only add up to 3 cards.', 'your-textdomain'),
        noticeOptions: {
            icon: <Icon icon={lock} fill="currentColor" />,
        },
    });

    return (
        // ...
    );
}
```

Pass `icon: null` to suppress the icon entirely.

> **Note:** Icons only render on snackbar notices. WordPress's default-type `<Notice>` component accepts the `icon` prop but does not render it.

### Sticky notice with a link

Render a sticky in-canvas warning (instead of a transient snackbar) with a "Learn more" link to your docs:

```js
import { useMaxInnerBlocks } from '@10up/block-components';
import { __ } from '@wordpress/i18n';

function BlockEdit({ clientId }) {
    useMaxInnerBlocks({
        clientId,
        max: 3,
        message: __('You can only add up to 3 cards.', 'your-textdomain'),
        noticeOptions: {
            type: 'default',
            explicitDismiss: true,
            actions: [
                {
                    label: __('Learn more', 'your-textdomain'),
                    url: 'https://example.com/docs/cards-block',
                },
            ],
        },
    });

    return (
        // ...
    );
}
```
