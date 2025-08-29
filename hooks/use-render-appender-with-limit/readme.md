# `useRenderAppenderWithLimit`

There are times when we need more granular control over how many blocks can be added to a block that supports inner blocks. That’s where the `useRenderAppenderWithLimit` custom hook comes in. With a single line of code, it gives us an easy way to enforce a maximum number of inner blocks.

The hook will return either false or the block appender, depending on the maximum limit you pass in. Behind the scenes, it handles the heavy lifting by fetching and counting the inner blocks for your block, then conditionally returning the appender only when allowed.

## Usage

```js
import { useBlockProps, useInnerBlockProps } from '@wordpress/block-editor';
import { useRenderAppenderWithLimit } from '@10up/block-components';

function BlockEdit() {
	const renderAppender = useRenderAppenderWithLimit(4);

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			...
			renderAppender,
		},
	);

	return (
		<div {...useBlockProps}>
			<div {...innerBlocksProps}>
		</div>
	);
}
```
