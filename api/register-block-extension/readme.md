# registerBlockExtension

The `registerBlockExtension` API is a wrapper to make it easier to add custom settings which produce classnames to any blocks. There are a few problems with using block styles for customizations. For one an editor cannot combine block styles. So you very quickly land in a situation where you need to add many block styles just to give an editor the ability to choose exactly the combination of options they want. That leads to a bad user experience though as the previews take up a ton of space and also make the editor slower due to the overhead of the iframes it creates. So in many cases it is nicer to extend a bock with custom settings to achieve the same goal. The process of registering your own attributes, modifying the blocks edit function, adding the new classname to the editor listing and also adding it to the frontend is rather cumbersome though. That is where this API comes in. It is a wrapper for the underlying filters that improves the editorial experience and reduces the amount of code that needs to get maintained in order to extend blocks.

## Usage

```js
import { registerBlockExtension } from '@10up/block-components';

/**
 * BlockEdit
 *
 * a react component that will get mounted in the Editor when the block is
 * selected. It is recommended to use Slots like `BlockControls` or `InspectorControls`
 * in here to put settings into the blocks toolbar or sidebar.
 *
 * @param {object} props block props
 * @returns {JSX}
 */
function BlockEdit(props) {...}

/**
 * generateClassNames
 *
 * a function to generate the new className string that should get added to
 * the wrapping element of the block.
 *
 * @param {object} attributes block attributes
 * @returns {string}
 */
function generateClassNames(attributes) {...}

registerBlockExtension(
 'core/group',
 {
  extensionName: 'background-patterns',
  attributes: {
   hasBackgroundPattern: {
    type: 'boolean',
    default: false,
   },
   backgroundPatternShape: {
    type: 'string',
    default: 'dots',
   },
   backgroundPatternColor: {
    type: 'string',
    default: 'green'
   }
  },
  classNameGenerator: generateClassNames,
  Edit: BlockEdit,
 }
);
```

## Options

| Name                       | Type       | Description                                       |
|----------------------------|------------|---------------------------------------------------|
| blockName                  | `string`   | Name of the block the options should get added to |
| options.extensionName      | `string`   | Unique Identifier of the option added    |
| options.attributes         | `object`   | Block Attributes that should get added to the block |
| options.classNameGenerator | `function` | Function that gets passed the attributes of the block to generate a class name string |
| options.Edit               | `function` | BlockEdit component like in `registerBlockType` only without the actual block. So only using slots like the `InspectorControls` is advised. |
