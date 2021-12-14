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
    trash
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
    ]
});