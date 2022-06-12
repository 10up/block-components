import { TextControl, ToggleControl, Button } from "@wordpress/components";
import { close, plus } from "@wordpress/icons";
import { __ } from '@wordpress/i18n';

import { Repeater } from "@10up/block-components";

export function BlockEdit(props) {
    function customAddButton(addItem) {
        return (
            <div className="repeater-controls">
                <div className="repeater-item-add">
                    <Button variant="primary" icon={plus} onClick={addItem}/>
                </div>
            </div>
        );
    }
    return (
        <>
            <style>
                {`
                    .repeater-table-example {
                        width: 100%;
                        border: 1px solid #ccc;
                    }
                    .repeater-item {
                        display: flex;
                        align-items: center;
                        border-bottom: 1px solid #ccc;
                    }
                    .repeater-item-page-name .components-base-control__field,
                    .repeater-item-visibility .components-base-control__field {
                        margin-bottom: 0;
                    }

                    .repeater-item-page-name {
                        flex: 1;
                        padding: 0 1rem;
                    }

                    .repeater-item-visibility .components-form-toggle {
                        margin-right: 0 !important;
                    }

                    .repeater-item-visibility,
                    .repeater-item-remove {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        padding: 16px;
                    }

                    .repeater-controls {
                        display: flex;
                        justify-content: end;
                        padding: 16px;
                    }

                    .repeater-item__drag-handle {
                        padding-left: 0.5rem;
                    }

                    .repeater-item__drag-handle + .repeater-item-page-name {
                        padding-left: 0;
                    }

                    .repeater-item--is-dragging {
                        border: 1px solid #ccc;
                        background-color: #fff;
                        box-shadow: 0 14px 28px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 22%);
                    }
                `}
            </style>
            <div className="repeater-table-example">
                <Repeater attribute="items" addButton={customAddButton} allowReordering={false}>
                    {
                        (item, index, setItem, removeItem) => (
                            <div key={index} className="repeater-item" style={{color: 'red'}}>
                                <div className="repeater-item-page-name">
                                    <TextControl value={item.pageName} onChange={(val) => setItem({pageName: val})} />
                                </div>
                                <div className="repeater-item-visibility">
                                    <ToggleControl checked={item.visibility} onChange={(val) => setItem({visibility: val})} />
                                </div>
                                <div className="repeater-item-remove">
                                    <Button icon={close} isDestructive label={ __('Remove') } onClick={removeItem} />
                                </div>
                            </div>
                        )
                    }
                </Repeater>
            </div>
        </>
    )
}