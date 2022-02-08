import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, ToggleControl, ColorPalette, BaseControl } from '@wordpress/components';

/**
 * BlockEdit
 *
 * a react component that will get mounted in the Editor when the block is
 * selected. It is reccomended to use Slots like `BlockControls` or `InspectorControls`
 * in here to put settings into the blocks toolbar or sidebar.
 *
 * @param {object} props block props
 * @returns {JSX}
 */
export function BlockEdit(props) {
    const { attributes, setAttributes } = props;
    const { hasBackgroundPattern, backgroundPatternShape, backgroundPatternColor } = attributes;

    const COLOR_OPTIONS = [
        {
            name: 'Green',
            slug: 'green',
            color: 'hsl(110, 100%, 50%)'
        },
        {
            name: 'Blue',
            slug: 'blue',
            color: 'hsl(230, 100%, 50%)'
        },
        {
            name: 'Red',
            slug: 'red',
            color: 'hsl(5, 100%, 50%)'
        }
    ];

    return (
        <InspectorControls>
            <PanelBody title="Background Pattern">
                <ToggleControl 
                    label="Show Background Pattern"
                    checked={hasBackgroundPattern}
                    onChange={ value => setAttributes( { hasBackgroundPattern: value } ) }
                />
                { hasBackgroundPattern && (
                    <>
                        <SelectControl 
                            label="Pattern Shape"
                            value={backgroundPatternShape}
                            options={[
                                { value: 'dots', label: "Dots" },
                                { value: 'squares', label: "Suares" },
                            ]}
                            onChange={value => setAttributes({backgroundPatternShape: value})}
                        />
                        <BaseControl label="Pattern Color">
                            <ColorPalette
                                colors={COLOR_OPTIONS}
                                disableCustomColors
                                value={COLOR_OPTIONS.find( item => item.slug === backgroundPatternColor ).color}
                                onChange={value => {
                                    const colorName = COLOR_OPTIONS.find( item => item.color === value ).slug
                                    setAttributes({
                                        backgroundPatternColor: colorName
                                    })
                                }}
                            />
                        </BaseControl>
                    </>
                ) }
            </PanelBody>
        </InspectorControls>
    );
}
