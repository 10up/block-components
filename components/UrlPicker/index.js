/**
 * WordPress dependencies
 */
 import { __ } from '@wordpress/i18n';
 import { useState } from '@wordpress/element';
 import {
   KeyboardShortcuts,
   Popover,
   Button,
   Tooltip,
 } from '@wordpress/components';
 import {
   PlainText,
   __experimentalLinkControl as LinkControl,
 } from '@wordpress/block-editor';
 import { rawShortcut } from '@wordpress/keycodes';
 import { debounce } from 'lodash'; 

 export default function UrlPicker({
   url,
   opensInNewTab,
   onLinkChange,
   onTextChange,
   placeholder,
   text,
   isBlockSelected,
   title,
   linkOptional,
   ...extraProps
 }) {
   const [isURLPickerOpen, setIsURLPickerOpen] = useState(false);
   const [selected, setSelected] = useState(false);

   const searchablePostTypes = [
		'post',
		'page',
	];

   const openLinkControl = () => {
	 setIsURLPickerOpen(true);
	 return false; // prevents default behaviour for event
   };
 
   const linkControl = isURLPickerOpen && (
	 <Popover
	   position="bottom center"
	   onClose={() => {
		 setIsURLPickerOpen(false);
		 setSelected(false);
	   }}
	 >
	   {title && <h4 className="tenup-popover-title">{title}</h4>}
	   <LinkControl
		 className="wp-block-navigation-link__inline-link-input"
		 value={{ url, opensInNewTab }}
		 onChange={onLinkChange}
		 suggestionsQuery={{
		   subtype: searchablePostTypes.join(','),
		 }}
	   />
	 </Popover>
   );
   return (
	 <div className="tenup-url-picker">
	   {selected && (
		 <KeyboardShortcuts
		   bindGlobal
		   shortcuts={{
			 [rawShortcut.primary('k')]: openLinkControl,
		   }}
		 />
	   )}
	   {linkControl}
	   <PlainText
		 value={text}
		 onChange={(value) => {
		   onTextChange(value.replace(/[\r\n\t]+/gm, ' '));
		 }}
		 placeholder={placeholder}
		 keepPlaceholderOnFocus
		 onFocus={debounce(() => {
		   setSelected(true);
		 }, 100)}
		 onBlur={debounce(() => {
		   setSelected(false);
		 }, 100)}
		 {...extraProps}
	   />
 
	   <Button
		 className={`
		 link-toggle is-small
		 ${selected && 'active'}
		 ${isBlockSelected || 'hidden'}
		 `}
		 icon={<span className="dashicons dashicons-admin-links"></span>}
		 onClick={openLinkControl}
	   />
 
	   {!linkOptional && text && !url && (
		 <Tooltip text={__('This item is missing a link', '10up-block-components')}>
		   <span
			 tabIndex={0}
			 className="missing-link dashicons dashicons-warning"
		   />
		 </Tooltip>
	   )}
	 </div>
   );
 }
 