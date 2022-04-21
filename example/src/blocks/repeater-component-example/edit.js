import { TextControl, ToggleControl, Button } from "@wordpress/components";
import { close, plus } from "@wordpress/icons";
import { __ } from '@wordpress/i18n';

import { Repeater } from "@10up/block-components";

export function BlockEdit(props) {
    function customAddButton(addItem) {
        return (
            <tr>
                <td></td>
                <td></td>
                <td className="repeater-item-add">
                    <Button variant="primary" icon={plus} onClick={addItem}/>
                </td>
            </tr>
        );
    }
    return (
        <>
            <style>
                {`
                    .repeater-table-example {
                        width: 100%;
                    }
                    .repeater-table-example, .repeater-table-example th, .repeater-table-example td {
                        border: 1px solid #a5a5a5;
                        border-collapse: collapse;
                        padding: 1rem;
                    }
                    .repeater-item-page-name .components-base-control__field {
                        margin-bottom: 0;
                    }
                    .repeater-item-visibility .components-toggle-control .components-base-control__field {
                        justify-content: center;
                        margin-bottom: 0;
                    }
                    .repeater-item-remove, .repeater-item-add {
                        text-align: center;
                    }
                    tbody tr:last-child, tbody > tr:last-child > td {
                        border: 0;
                    }
                `}
            </style>
            <table className="repeater-table-example">
                <thead>
                    <tr>
                        <th>{ __( 'Page' ) }</th>
                        <th>{ __( 'Visibility' ) }</th>
                    </tr>
                </thead>
                <tbody>
                    <Repeater attribute="items" addButton={customAddButton}>
                        {
                            (item, index, setItem, removeItem) => (
                                <tr key={index}>
                                    <td className="repeater-item-page-name">
                                        <TextControl value={item.pageName} onChange={(val) => setItem({pageName: val})} />
                                    </td>
                                    <td className="repeater-item-visibility">
                                        <ToggleControl checked={item.visibility} onChange={(val) => setItem({visibility: val})} />
                                    </td>
                                    <td className="repeater-item-remove">
                                        <Button icon={close} isDestructive label={ __('Remove') } onClick={removeItem} />
                                    </td>
                                </tr>
                            )
                        }
                    </Repeater>
                </tbody>
            </table>
        </>
    )
}