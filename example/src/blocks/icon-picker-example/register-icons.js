import {
    Icon as CoreIcon,
    search,
    edit,
    cloud,
    starFilled,
    archive,
    blockDefault,
    calendar,
    cog,
    globe,
    institution,
    reusableBlock,
    tool,
    trash,
    addCard,
    addSubmenu,
    alignCenter,
    alignJustify,
    alignJustifyAlt,
    alignLeft,
    alignNone,
    alignRight,
    archiveTitle,
    arrowDown,
    arrowLeft,
    arrowRight,
    arrowUp,
    aspectRatio,
    atSymbol,
    audio,
    backup,
    blockTable,
    brush,
    bug,
    button,
    buttons,
    cancelCircleFilled,
    capturePhoto,
    captureVideo,
    category,
    chartBar,
    check
} from '@wordpress/icons';
import { renderToString } from '@wordpress/element';

import { registerIcons } from '@10up/block-components';

registerIcons({
    name: 'example/theme',
    label: "Example",
    icons: [
        {
            source: renderToString(<CoreIcon icon={search} />),
            name: "search",
            label: "Search"
        },
        {
            source: renderToString(<CoreIcon icon={edit} />),
            name: "edit",
            label: "Edit"
        },
        {
            source: renderToString(<CoreIcon icon={cloud} />),
            name: "cloud",
            label: "Cloud"
        },
        {
            source: renderToString(<CoreIcon icon={starFilled} />),
            name: "star-filled",
            label: "Star Filled"
        },
        {
            source: renderToString(<CoreIcon icon={archive} />),
            name: "archive",
            label: "Archive"
        },
        {
            source: renderToString(<CoreIcon icon={blockDefault} />),
            name: "blockDefault",
            label: "Default Block"
        },
        {
            source: renderToString(<CoreIcon icon={calendar} />),
            name: "calendar",
            label: "Calendar"
        },
        {
            source: renderToString(<CoreIcon icon={cog} />),
            name: "cog",
            label: "Cog"
        },
        {
            source: renderToString(<CoreIcon icon={globe} />),
            name: "globe",
            label: "Globe"
        },
        {
            source: renderToString(<CoreIcon icon={institution} />),
            name: "institution",
            label: "Institution"
        },
        {
            source: renderToString(<CoreIcon icon={reusableBlock} />),
            name: "reusableBlock",
            label: "Reusable Block"
        },
        {
            source: renderToString(<CoreIcon icon={tool} />),
            name: "tool",
            label: "Tool"
        },
        {
            source: renderToString(<CoreIcon icon={trash} />),
            name: "trash",
            label: "Trash"
        },
        {
            source: renderToString( <CoreIcon icon={addCard} />),
            name: "addCard",
            label: "addCard"
        },
        {
            source: renderToString( <CoreIcon icon={addSubmenu} />),
            name: "addSubmenu",
            label: "addSubmenu"
        },
        {
            source: renderToString( <CoreIcon icon={alignCenter} />),
            name: "alignCenter",
            label: "alignCenter"
        },
        {
            source: renderToString( <CoreIcon icon={alignJustify} />),
            name: "alignJustify",
            label: "alignJustify"
        },
        {
            source: renderToString( <CoreIcon icon={alignJustifyAlt} />),
            name: "alignJustifyAlt",
            label: "alignJustifyAlt"
        },
        {
            source: renderToString( <CoreIcon icon={alignLeft} />),
            name: "alignLeft",
            label: "alignLeft"
        },
        {
            source: renderToString( <CoreIcon icon={alignNone} />),
            name: "alignNone",
            label: "alignNone"
        },
        {
            source: renderToString( <CoreIcon icon={alignRight} />),
            name: "alignRight",
            label: "alignRight"
        },
        {
            source: renderToString( <CoreIcon icon={archiveTitle} />),
            name: "archiveTitle",
            label: "archiveTitle"
        },
        {
            source: renderToString( <CoreIcon icon={arrowDown} />),
            name: "arrowDown",
            label: "arrowDown"
        },
        {
            source: renderToString( <CoreIcon icon={arrowLeft} />),
            name: "arrowLeft",
            label: "arrowLeft"
        },
        {
            source: renderToString( <CoreIcon icon={arrowRight} />),
            name: "arrowRight",
            label: "arrowRight"
        },
        {
            source: renderToString( <CoreIcon icon={arrowUp} />),
            name: "arrowUp",
            label: "arrowUp"
        },
        {
            source: renderToString( <CoreIcon icon={aspectRatio} />),
            name: "aspectRatio",
            label: "aspectRatio"
        },
        {
            source: renderToString( <CoreIcon icon={atSymbol} />),
            name: "atSymbol",
            label: "atSymbol"
        },
        {
            source: renderToString( <CoreIcon icon={audio} />),
            name: "audio",
            label: "audio"
        },
        {
            source: renderToString( <CoreIcon icon={backup} />),
            name: "backup",
            label: "backup"
        },
        {
            source: renderToString( <CoreIcon icon={blockTable} />),
            name: "blockTable",
            label: "blockTable"
        },
        {
            source: renderToString( <CoreIcon icon={brush} />),
            name: "brush",
            label: "brush"
        },
        {
            source: renderToString( <CoreIcon icon={bug} />),
            name: "bug",
            label: "bug"
        },
        {
            source: renderToString( <CoreIcon icon={button} />),
            name: "button",
            label: "button"
        },
        {
            source: renderToString( <CoreIcon icon={buttons} />),
            name: "buttons",
            label: "buttons"
        },
        {
            source: renderToString( <CoreIcon icon={cancelCircleFilled} />),
            name: "cancelCircleFilled",
            label: "cancelCircleFilled"
        },
        {
            source: renderToString( <CoreIcon icon={capturePhoto} />),
            name: "capturePhoto",
            label: "capturePhoto"
        },
        {
            source: renderToString( <CoreIcon icon={captureVideo} />),
            name: "captureVideo",
            label: "captureVideo"
        },
        {
            source: renderToString( <CoreIcon icon={category} />),
            name: "category",
            label: "category"
        },
        {
            source: renderToString( <CoreIcon icon={chartBar} />),
            name: "chartBar",
            label: "chartBar"
        },
    ]
});