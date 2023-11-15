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
    alignLeft,
    alignNone,
    alignRight,
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
        {
            source: renderToString(<CoreIcon icon={search} />),
            name: "search-2",
            label: "Search"
        },
        {
            source: renderToString(<CoreIcon icon={edit} />),
            name: "edit-2",
            label: "Edit"
        },
        {
            source: renderToString(<CoreIcon icon={cloud} />),
            name: "cloud-2",
            label: "Cloud"
        },
        {
            source: renderToString(<CoreIcon icon={starFilled} />),
            name: "star-filled-2",
            label: "Star Filled"
        },
        {
            source: renderToString(<CoreIcon icon={archive} />),
            name: "archive-2",
            label: "Archive"
        },
        {
            source: renderToString(<CoreIcon icon={blockDefault} />),
            name: "blockDefault-2",
            label: "Default Block"
        },
        {
            source: renderToString(<CoreIcon icon={calendar} />),
            name: "calendar-2",
            label: "Calendar"
        },
        {
            source: renderToString(<CoreIcon icon={cog} />),
            name: "cog-2",
            label: "Cog"
        },
        {
            source: renderToString(<CoreIcon icon={globe} />),
            name: "globe-2",
            label: "Globe"
        },
        {
            source: renderToString(<CoreIcon icon={institution} />),
            name: "institution-2",
            label: "Institution"
        },
        {
            source: renderToString(<CoreIcon icon={reusableBlock} />),
            name: "reusableBlock-2",
            label: "Reusable Block"
        },
        {
            source: renderToString(<CoreIcon icon={tool} />),
            name: "tool-2",
            label: "Tool"
        },
        {
            source: renderToString(<CoreIcon icon={trash} />),
            name: "trash-2",
            label: "Trash"
        },
        {
            source: renderToString( <CoreIcon icon={addCard} />),
            name: "addCard-2",
            label: "addCard"
        },
        {
            source: renderToString( <CoreIcon icon={addSubmenu} />),
            name: "addSubmenu-2",
            label: "addSubmenu"
        },
        {
            source: renderToString( <CoreIcon icon={alignCenter} />),
            name: "alignCenter-2",
            label: "alignCenter"
        },
        {
            source: renderToString( <CoreIcon icon={alignJustify} />),
            name: "alignJustify-2",
            label: "alignJustify"
        },
        {
            source: renderToString( <CoreIcon icon={alignLeft} />),
            name: "alignLeft-2",
            label: "alignLeft"
        },
        {
            source: renderToString( <CoreIcon icon={alignNone} />),
            name: "alignNone-2",
            label: "alignNone"
        },
        {
            source: renderToString( <CoreIcon icon={alignRight} />),
            name: "alignRight-2",
            label: "alignRight"
        },
        {
            source: renderToString( <CoreIcon icon={arrowDown} />),
            name: "arrowDown-2",
            label: "arrowDown"
        },
        {
            source: renderToString( <CoreIcon icon={arrowLeft} />),
            name: "arrowLeft-2",
            label: "arrowLeft"
        },
        {
            source: renderToString( <CoreIcon icon={arrowRight} />),
            name: "arrowRight-2",
            label: "arrowRight"
        },
        {
            source: renderToString( <CoreIcon icon={arrowUp} />),
            name: "arrowUp-2",
            label: "arrowUp"
        },
        {
            source: renderToString( <CoreIcon icon={aspectRatio} />),
            name: "aspectRatio-2",
            label: "aspectRatio"
        },
        {
            source: renderToString( <CoreIcon icon={atSymbol} />),
            name: "atSymbol-2",
            label: "atSymbol"
        },
        {
            source: renderToString( <CoreIcon icon={audio} />),
            name: "audio-2",
            label: "audio"
        },
        {
            source: renderToString( <CoreIcon icon={backup} />),
            name: "backup-2",
            label: "backup"
        },
        {
            source: renderToString( <CoreIcon icon={blockTable} />),
            name: "blockTable-2",
            label: "blockTable"
        },
        {
            source: renderToString( <CoreIcon icon={brush} />),
            name: "brush-2",
            label: "brush"
        },
        {
            source: renderToString( <CoreIcon icon={bug} />),
            name: "bug-2",
            label: "bug"
        },
        {
            source: renderToString( <CoreIcon icon={button} />),
            name: "button-2",
            label: "button"
        },
        {
            source: renderToString( <CoreIcon icon={buttons} />),
            name: "buttons-2",
            label: "buttons"
        },
        {
            source: renderToString( <CoreIcon icon={cancelCircleFilled} />),
            name: "cancelCircleFilled-2",
            label: "cancelCircleFilled"
        },
        {
            source: renderToString( <CoreIcon icon={capturePhoto} />),
            name: "capturePhoto-2",
            label: "capturePhoto"
        },
        {
            source: renderToString( <CoreIcon icon={captureVideo} />),
            name: "captureVideo-2",
            label: "captureVideo"
        },
        {
            source: renderToString( <CoreIcon icon={category} />),
            name: "category-2",
            label: "category"
        },
        {
            source: renderToString( <CoreIcon icon={chartBar} />),
            name: "chartBar-2",
            label: "chartBar"
        },
        {
            source: renderToString(<CoreIcon icon={search} />),
            name: "search-3",
            label: "Search"
        },
        {
            source: renderToString(<CoreIcon icon={edit} />),
            name: "edit-3",
            label: "Edit"
        },
        {
            source: renderToString(<CoreIcon icon={cloud} />),
            name: "cloud-3",
            label: "Cloud"
        },
        {
            source: renderToString(<CoreIcon icon={starFilled} />),
            name: "star-filled-3",
            label: "Star Filled"
        },
        {
            source: renderToString(<CoreIcon icon={archive} />),
            name: "archive-3",
            label: "Archive"
        },
        {
            source: renderToString(<CoreIcon icon={blockDefault} />),
            name: "blockDefault-3",
            label: "Default Block"
        },
        {
            source: renderToString(<CoreIcon icon={calendar} />),
            name: "calendar-3",
            label: "Calendar"
        },
        {
            source: renderToString(<CoreIcon icon={cog} />),
            name: "cog-3",
            label: "Cog"
        },
        {
            source: renderToString(<CoreIcon icon={globe} />),
            name: "globe-3",
            label: "Globe"
        },
        {
            source: renderToString(<CoreIcon icon={institution} />),
            name: "institution-3",
            label: "Institution"
        },
        {
            source: renderToString(<CoreIcon icon={reusableBlock} />),
            name: "reusableBlock-3",
            label: "Reusable Block"
        },
        {
            source: renderToString(<CoreIcon icon={tool} />),
            name: "tool-3",
            label: "Tool"
        },
        {
            source: renderToString(<CoreIcon icon={trash} />),
            name: "trash-3",
            label: "Trash"
        },
        {
            source: renderToString( <CoreIcon icon={addCard} />),
            name: "addCard-3",
            label: "addCard"
        },
        {
            source: renderToString( <CoreIcon icon={addSubmenu} />),
            name: "addSubmenu-3",
            label: "addSubmenu"
        },
        {
            source: renderToString( <CoreIcon icon={alignCenter} />),
            name: "alignCenter-3",
            label: "alignCenter"
        },
        {
            source: renderToString( <CoreIcon icon={alignJustify} />),
            name: "alignJustify-3",
            label: "alignJustify"
        },
        {
            source: renderToString( <CoreIcon icon={alignLeft} />),
            name: "alignLeft-3",
            label: "alignLeft"
        },
        {
            source: renderToString( <CoreIcon icon={alignNone} />),
            name: "alignNone-3",
            label: "alignNone"
        },
        {
            source: renderToString( <CoreIcon icon={alignRight} />),
            name: "alignRight-3",
            label: "alignRight"
        },
        {
            source: renderToString( <CoreIcon icon={arrowDown} />),
            name: "arrowDown-3",
            label: "arrowDown"
        },
        {
            source: renderToString( <CoreIcon icon={arrowLeft} />),
            name: "arrowLeft-3",
            label: "arrowLeft"
        },
        {
            source: renderToString( <CoreIcon icon={arrowRight} />),
            name: "arrowRight-3",
            label: "arrowRight"
        },
        {
            source: renderToString( <CoreIcon icon={arrowUp} />),
            name: "arrowUp-3",
            label: "arrowUp"
        },
        {
            source: renderToString( <CoreIcon icon={aspectRatio} />),
            name: "aspectRatio-3",
            label: "aspectRatio"
        },
        {
            source: renderToString( <CoreIcon icon={atSymbol} />),
            name: "atSymbol-3",
            label: "atSymbol"
        },
        {
            source: renderToString( <CoreIcon icon={audio} />),
            name: "audio-3",
            label: "audio"
        },
        {
            source: renderToString( <CoreIcon icon={backup} />),
            name: "backup-3",
            label: "backup"
        },
        {
            source: renderToString( <CoreIcon icon={blockTable} />),
            name: "blockTable-3",
            label: "blockTable"
        },
        {
            source: renderToString( <CoreIcon icon={brush} />),
            name: "brush-3",
            label: "brush"
        },
        {
            source: renderToString( <CoreIcon icon={bug} />),
            name: "bug-3",
            label: "bug"
        },
        {
            source: renderToString( <CoreIcon icon={button} />),
            name: "button-3",
            label: "button"
        },
        {
            source: renderToString( <CoreIcon icon={buttons} />),
            name: "buttons-3",
            label: "buttons"
        },
        {
            source: renderToString( <CoreIcon icon={cancelCircleFilled} />),
            name: "cancelCircleFilled-3",
            label: "cancelCircleFilled"
        },
        {
            source: renderToString( <CoreIcon icon={capturePhoto} />),
            name: "capturePhoto-3",
            label: "capturePhoto"
        },
        {
            source: renderToString( <CoreIcon icon={captureVideo} />),
            name: "captureVideo-3",
            label: "captureVideo"
        },
        {
            source: renderToString( <CoreIcon icon={category} />),
            name: "category-3",
            label: "category"
        },
        {
            source: renderToString( <CoreIcon icon={chartBar} />),
            name: "chartBar-3",
            label: "chartBar"
        },
        {
            source: renderToString(<CoreIcon icon={search} />),
            name: "search-4",
            label: "Search"
        },
        {
            source: renderToString(<CoreIcon icon={edit} />),
            name: "edit-4",
            label: "Edit"
        },
        {
            source: renderToString(<CoreIcon icon={cloud} />),
            name: "cloud-4",
            label: "Cloud"
        },
        {
            source: renderToString(<CoreIcon icon={starFilled} />),
            name: "star-filled-4",
            label: "Star Filled"
        },
        {
            source: renderToString(<CoreIcon icon={archive} />),
            name: "archive-4",
            label: "Archive"
        },
        {
            source: renderToString(<CoreIcon icon={blockDefault} />),
            name: "blockDefault-4",
            label: "Default Block"
        },
        {
            source: renderToString(<CoreIcon icon={calendar} />),
            name: "calendar-4",
            label: "Calendar"
        },
        {
            source: renderToString(<CoreIcon icon={cog} />),
            name: "cog-4",
            label: "Cog"
        },
        {
            source: renderToString(<CoreIcon icon={globe} />),
            name: "globe-4",
            label: "Globe"
        },
        {
            source: renderToString(<CoreIcon icon={institution} />),
            name: "institution-4",
            label: "Institution"
        },
        {
            source: renderToString(<CoreIcon icon={reusableBlock} />),
            name: "reusableBlock-4",
            label: "Reusable Block"
        },
        {
            source: renderToString(<CoreIcon icon={tool} />),
            name: "tool-4",
            label: "Tool"
        },
        {
            source: renderToString(<CoreIcon icon={trash} />),
            name: "trash-4",
            label: "Trash"
        },
        {
            source: renderToString( <CoreIcon icon={addCard} />),
            name: "addCard-4",
            label: "addCard"
        },
        {
            source: renderToString( <CoreIcon icon={addSubmenu} />),
            name: "addSubmenu-4",
            label: "addSubmenu"
        },
        {
            source: renderToString( <CoreIcon icon={alignCenter} />),
            name: "alignCenter-4",
            label: "alignCenter"
        },
        {
            source: renderToString( <CoreIcon icon={alignJustify} />),
            name: "alignJustify-4",
            label: "alignJustify"
        },
        {
            source: renderToString( <CoreIcon icon={alignLeft} />),
            name: "alignLeft-4",
            label: "alignLeft"
        },
        {
            source: renderToString( <CoreIcon icon={alignNone} />),
            name: "alignNone-4",
            label: "alignNone"
        },
        {
            source: renderToString( <CoreIcon icon={alignRight} />),
            name: "alignRight-4",
            label: "alignRight"
        },
        {
            source: renderToString( <CoreIcon icon={arrowDown} />),
            name: "arrowDown-4",
            label: "arrowDown"
        },
        {
            source: renderToString( <CoreIcon icon={arrowLeft} />),
            name: "arrowLeft-4",
            label: "arrowLeft"
        },
        {
            source: renderToString( <CoreIcon icon={arrowRight} />),
            name: "arrowRight-4",
            label: "arrowRight"
        },
        {
            source: renderToString( <CoreIcon icon={arrowUp} />),
            name: "arrowUp-4",
            label: "arrowUp"
        },
        {
            source: renderToString( <CoreIcon icon={aspectRatio} />),
            name: "aspectRatio-4",
            label: "aspectRatio"
        },
        {
            source: renderToString( <CoreIcon icon={atSymbol} />),
            name: "atSymbol-4",
            label: "atSymbol"
        },
        {
            source: renderToString( <CoreIcon icon={audio} />),
            name: "audio-4",
            label: "audio"
        },
        {
            source: renderToString( <CoreIcon icon={backup} />),
            name: "backup-4",
            label: "backup"
        },
        {
            source: renderToString( <CoreIcon icon={blockTable} />),
            name: "blockTable-4",
            label: "blockTable"
        },
        {
            source: renderToString( <CoreIcon icon={brush} />),
            name: "brush-4",
            label: "brush"
        },
        {
            source: renderToString( <CoreIcon icon={bug} />),
            name: "bug-4",
            label: "bug"
        },
        {
            source: renderToString( <CoreIcon icon={button} />),
            name: "button-4",
            label: "button"
        },
        {
            source: renderToString( <CoreIcon icon={buttons} />),
            name: "buttons-4",
            label: "buttons"
        },
        {
            source: renderToString( <CoreIcon icon={cancelCircleFilled} />),
            name: "cancelCircleFilled-4",
            label: "cancelCircleFilled"
        },
        {
            source: renderToString( <CoreIcon icon={capturePhoto} />),
            name: "capturePhoto-4",
            label: "capturePhoto"
        },
        {
            source: renderToString( <CoreIcon icon={captureVideo} />),
            name: "captureVideo-4",
            label: "captureVideo"
        },
        {
            source: renderToString( <CoreIcon icon={category} />),
            name: "category-4",
            label: "category"
        },
        {
            source: renderToString( <CoreIcon icon={chartBar} />),
            name: "chartBar-4",
            label: "chartBar"
        },
        {
            source: renderToString(<CoreIcon icon={search} />),
            name: "search-5",
            label: "Search"
        },
        {
            source: renderToString(<CoreIcon icon={edit} />),
            name: "edit-5",
            label: "Edit"
        },
        {
            source: renderToString(<CoreIcon icon={cloud} />),
            name: "cloud-5",
            label: "Cloud"
        },
        {
            source: renderToString(<CoreIcon icon={starFilled} />),
            name: "star-filled-5",
            label: "Star Filled"
        },
        {
            source: renderToString(<CoreIcon icon={archive} />),
            name: "archive-5",
            label: "Archive"
        },
        {
            source: renderToString(<CoreIcon icon={blockDefault} />),
            name: "blockDefault-5",
            label: "Default Block"
        },
        {
            source: renderToString(<CoreIcon icon={calendar} />),
            name: "calendar-5",
            label: "Calendar"
        },
        {
            source: renderToString(<CoreIcon icon={cog} />),
            name: "cog-5",
            label: "Cog"
        },
        {
            source: renderToString(<CoreIcon icon={globe} />),
            name: "globe-5",
            label: "Globe"
        },
        {
            source: renderToString(<CoreIcon icon={institution} />),
            name: "institution-5",
            label: "Institution"
        },
        {
            source: renderToString(<CoreIcon icon={reusableBlock} />),
            name: "reusableBlock-5",
            label: "Reusable Block"
        },
        {
            source: renderToString(<CoreIcon icon={tool} />),
            name: "tool-5",
            label: "Tool"
        },
        {
            source: renderToString(<CoreIcon icon={trash} />),
            name: "trash-5",
            label: "Trash"
        },
        {
            source: renderToString( <CoreIcon icon={addCard} />),
            name: "addCard-5",
            label: "addCard"
        },
        {
            source: renderToString( <CoreIcon icon={addSubmenu} />),
            name: "addSubmenu-5",
            label: "addSubmenu"
        },
        {
            source: renderToString( <CoreIcon icon={alignCenter} />),
            name: "alignCenter-5",
            label: "alignCenter"
        },
        {
            source: renderToString( <CoreIcon icon={alignJustify} />),
            name: "alignJustify-5",
            label: "alignJustify"
        },
        {
            source: renderToString( <CoreIcon icon={alignLeft} />),
            name: "alignLeft-5",
            label: "alignLeft"
        },
        {
            source: renderToString( <CoreIcon icon={alignNone} />),
            name: "alignNone-5",
            label: "alignNone"
        },
        {
            source: renderToString( <CoreIcon icon={alignRight} />),
            name: "alignRight-5",
            label: "alignRight"
        },
        {
            source: renderToString( <CoreIcon icon={arrowDown} />),
            name: "arrowDown-5",
            label: "arrowDown"
        },
        {
            source: renderToString( <CoreIcon icon={arrowLeft} />),
            name: "arrowLeft-5",
            label: "arrowLeft"
        },
        {
            source: renderToString( <CoreIcon icon={arrowRight} />),
            name: "arrowRight-5",
            label: "arrowRight"
        },
        {
            source: renderToString( <CoreIcon icon={arrowUp} />),
            name: "arrowUp-5",
            label: "arrowUp"
        },
        {
            source: renderToString( <CoreIcon icon={aspectRatio} />),
            name: "aspectRatio-5",
            label: "aspectRatio"
        },
        {
            source: renderToString( <CoreIcon icon={atSymbol} />),
            name: "atSymbol-5",
            label: "atSymbol"
        },
        {
            source: renderToString( <CoreIcon icon={audio} />),
            name: "audio-5",
            label: "audio"
        },
        {
            source: renderToString( <CoreIcon icon={backup} />),
            name: "backup-5",
            label: "backup"
        },
        {
            source: renderToString( <CoreIcon icon={blockTable} />),
            name: "blockTable-5",
            label: "blockTable"
        },
        {
            source: renderToString( <CoreIcon icon={brush} />),
            name: "brush-5",
            label: "brush"
        },
        {
            source: renderToString( <CoreIcon icon={bug} />),
            name: "bug-5",
            label: "bug"
        },
        {
            source: renderToString( <CoreIcon icon={button} />),
            name: "button-5",
            label: "button"
        },
        {
            source: renderToString( <CoreIcon icon={buttons} />),
            name: "buttons-5",
            label: "buttons"
        },
        {
            source: renderToString( <CoreIcon icon={cancelCircleFilled} />),
            name: "cancelCircleFilled-5",
            label: "cancelCircleFilled"
        },
        {
            source: renderToString( <CoreIcon icon={capturePhoto} />),
            name: "capturePhoto-5",
            label: "capturePhoto"
        },
        {
            source: renderToString( <CoreIcon icon={captureVideo} />),
            name: "captureVideo-5",
            label: "captureVideo"
        },
        {
            source: renderToString( <CoreIcon icon={category} />),
            name: "category-5",
            label: "category"
        },
        {
            source: renderToString( <CoreIcon icon={chartBar} />),
            name: "chartBar-5",
            label: "chartBar"
        },
    ]
});