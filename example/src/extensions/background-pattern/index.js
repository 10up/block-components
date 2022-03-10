import { registerBlockExtension } from "@10up/block-components";
import { BlockEdit } from "./edit";

const BACKGROUND_ATTRIBUTES = {
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
};

/**
 * generateClassNames
 *
 * a function to generate the new className string that should get added to
 * the wrapping element of the block.
 *
 * @param {object} attributes block attributes
 * @returns {string}
 */
function generateClassNames(attributes) {
const { hasBackgroundPattern, backgroundPatternShape, backgroundPatternColor } = attributes;

if ( ! hasBackgroundPattern ) {
    return;
}

const backgroundPatternColorClassName = `has-${backgroundPatternColor}-background-patern-color`;
const backgroundPatternShapeClassName = `has-${backgroundPatternShape}-background-patern-shape`;

return `has-background-pattern ${backgroundPatternColorClassName} ${backgroundPatternShapeClassName}`;

}
 
registerBlockExtension(
    'core/group',
    {
        extensionName: 'background-patterns',
        attributes: BACKGROUND_ATTRIBUTES,
        classNameGenerator: generateClassNames,
        Edit: BlockEdit,
    }
);