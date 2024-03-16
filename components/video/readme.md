# Video

The Video component allows you to easily add videos to your custom blocks without needing to manually worry about loading states etc. It renders a `<MediaPlaceholder />` component in place of the video if the id is not set and shows a spinner when the video is still loading.

## Usage

```js
import { Video } from '@10up/block-components';

function BlockEdit(props) {
    const { attributes, setAttributes } = props;
    const { videoId } = attributes;

    function handlevideoSelect( video ) {
        setAttributes({videoId: video.id});
    }

    return (
        <Video
            id={videoId}
            className="my-video"
            size="full"
            onSelect={handlevideoSelect}
            labels={{
                title: 'Select looping background video',
                instructions: 'Upload a media file or pick one from your media library.'
            }}
			autoPlay={true}
			loop={true}
			muted={true}
			controls={false}
        />
    )
}
```

If you'd like to make an Inspector control for this video, use `VideoControl` instead.

```js
import { Video } from '@10up/block-components';

function BlockEdit(props) {
    const { attributes, setAttributes } = props;
    const { videoId } = attributes;

    function handlevideoSelect( video ) {
        setAttributes({videoId: video.id});
    }

    return (
        <Video
            id={videoId}
            className="my-video"
            size="full"
            onSelect={handlevideoSelect}
            labels={{
                title: 'Select looping background video',
                instructions: 'Upload a media file or pick one from your media library.'
            }}
        />
    )
}
```

While you can set the same `autoPlay`, `loop`, and `muted` properties to the `Video` or `VideoControl` directly, you can also allow the user to control these settings by passing a `onChangeVideoOptions` callback, and a `videoOptions` setting object:

```js
import { Video } from '@10up/block-components';

function BlockEdit(props) {
    const { attributes, setAttributes } = props;
    const {
		videoId,
		videoOptions = {
			playsInline: true,
			controls: true,
			muted: true,
			autoPlay: false,
			loop: false,
		}
	} = attributes;

    function handleVideoSelect( video ) {
        setAttributes({videoId: video.id});
    }

	function handleChangeVideoOptions( options ) {
		setAttributes({videoOptions: options});
	}

    return (
        <Video
            id={videoId}
            className="my-video"
            size="full"
            onSelect={handleVideoSelect}
            labels={{
                title: 'Select looping background video',
                instructions: 'Upload a media file or pick one from your media library.'
            }}
        />
    )
}
```



##

> **Note**
> In order to get the same result as the GIF you also need to use the [`MediaToolbar`](https://github.com/10up/block-components/tree/develop/components/media-toolbar) component. It adds the Replace flow to the Blocks Toolbar.

## Props

| Name       | Type              | Default  |  Description                                                   |
| ---------- | ----------------- | -------- | -------------------------------------------------------------- |
| `id` | `number`    | `null`   | video ID          |
| `onSelect` | `Function` | `null` | Callback that gets called with the new video when one is selected |
| `size` | `string` | `large` | Name of the video size to be displayed |
| `labels` | `object` | `{}` | Pass in an object of labels to be used by the `MediaPlaceholder` component under the hook. Allows the sub properties `title` and `instructions` |
| `canEditVideo` | `boolean` | `true` | whether or not the video can be edited by in the context its getting viewed. Controls whether a placeholder or upload controls should be shown when no video is present |
| `...rest` | `*` | `null` | any additional attributes you want to pass to the underlying `img` tag |
