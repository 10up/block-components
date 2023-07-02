import { createHigherOrderComponent } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { store as requiredFieldsStore } from './store';
import { __ } from '@wordpress/i18n';

const blockWithIncompleteRequireFields = createHigherOrderComponent(
	( BlockListBlock ) => {
		return ( props ) => {
			const { blockHasErrors } = useSelect( ( select ) => {
				return {
					blockHasErrors: select( requiredFieldsStore ).blockHasErrors( props.clientId ),
				}
			} );

			const wrapperPropsStyle = {
				outline: ! props.isSelected && blockHasErrors ? '2px solid red' : 'initial'
			};
			
			const errorMessageStyle = {
				backgroundColor: '#DC3232',
				color: '#fff',
				display: 'block',
				textAlign: 'center',
				fontSize: '0.85rem',
				padding: '0.15rem',
				borderRadius: '4px',
				maxWidth: '600px',
			};

			return (
				<>
					<BlockListBlock
						{ ...props }
						className={ `${ ! props.isSelected && blockHasErrors ? 'required-field-has-errors' : '' }` }
						wrapperProps={
							{
								style: wrapperPropsStyle
							}
						}
					/>
					{
						! props.isSelected && blockHasErrors && (
							<span style={ errorMessageStyle }>
								{ __( 'Publishing/updating post will be disabled until all required field(s) in this block are set.' ) }
							</span>
						)
					}
				</>
			);
		};
	},
	'blockWithIncompleteRequireFields'
);

wp.hooks.addFilter(
	'editor.BlockListBlock',
	'my-plugin/with-client-id-class-name',
	blockWithIncompleteRequireFields
);
