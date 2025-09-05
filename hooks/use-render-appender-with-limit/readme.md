# `useRenderAppenderWithLimit`

There are times when we need more granular control over how many blocks can be added to a block that supports inner blocks. That’s where the `useRenderAppenderWithLimit` custom hook comes in. With a single line of code, it gives us an easy way to enforce a maximum number of inner blocks.

The hook will return either false or the block appender, depending on the maximum limit you pass in. Behind the scenes, it handles the heavy lifting by fetching and counting the inner blocks for your block, then conditionally returning the appender only when allowed.

## Parameters

- **`limit`** (`number`): The maximum number of inner blocks allowed. When the current number of inner blocks reaches this limit, the appender will not be rendered.
- **`appender`** (`React.ComponentType`, optional): The React component to render as the block appender when under the limit. Defaults to `InnerBlocks.DefaultBlockAppender` if not provided.

## Usage

**Default**
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
		<div {...blockProps}>
			<div {...innerBlocksProps}>
		</div>
	);
}
```

**Button Type Appender**
```js
import { useBlockProps, useInnerBlocksProps, ButtonBlockAppender } from '@wordpress/block-editor';
import { useRenderAppenderWithLimit } from '@10up/block-components';

function BlockEdit(props) {
	const { clientId } = props;
	const renderAppender = useRenderAppenderWithLimit(4, () => <ButtonBlockAppender rootClientId={clientId} />);

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			...
			renderAppender,
		},
	);

	return (
		<div {...blockProps}>
			<div {...innerBlocksProps}>
		</div>
	);
}
```
> [!NOTE]
> For appenders that require props (like `ButtonBlockAppender` needing `rootClientId`), pass a function component that returns the appender with the required props.

**Custom Appender**
```js
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useRenderAppenderWithLimit } from '@10up/block-components';
import { __ } from '@wordpress/i18n';

// Custom appender component
function CustomAppender({ children, ...props }) {
	return (
		<div className="custom-appender" {...props}>
			<Button variant="secondary" className="custom-add-button">
				{__('+ Add New Block', 'text-domain')}
			</Button>
			{children}
		</div>
	);
}

function BlockEdit() {
	const renderAppender = useRenderAppenderWithLimit(4, CustomAppender);

	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			...
			renderAppender,
		},
	);

	return (
		<div {...blockProps}>
			<div {...innerBlocksProps}>
		</div>
	);
}
```

> [!NOTE]
> For a fully functional custom appender that can actually add blocks, you would need to implement the block insertion logic using WordPress's `useBlockEditor` hook or similar APIs. The example above shows the structure, but in practice, you'd typically use one of WordPress's built-in appenders like `ButtonBlockAppender` or `DefaultBlockAppender` for functionality.
