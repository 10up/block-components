# 10up Block Components

> A collection of components built to be used in the block editor.

[![Support Level](https://img.shields.io/badge/support-active-green.svg)](#support-level)
[![10up Block Components](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/dnr1ke&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/dnr1ke/runs)

## Overview

A collection of components built to be used in the block editor. These components do not include any build files and do not bundle the WordPress components. Therefore these need to be used in an environment where the [`Dependency Extraction Webpack Plugin`](https://www.npmjs.com/package/@wordpress/dependency-extraction-webpack-plugin) is used and the `import { component } from '@wordpress/package';` is supported. If your project is using [10up-toolkit](https://github.com/10up/10up-toolkit), this is handled automatically.

## Installation

1. Run `npm install --save @10up/block-components` within your WordPress theme or plugin.
2. Within your block editor code, import the relevant component(s) e.g. `import { ContentPicker } from '@10up/block-components';`
3. We highly recommend you use [10up-toolkit](https://github.com/10up/10up-toolkit) to build your block files as it handles dependency extraction for you.

## APIs

- [registerBlockExtension](./api/register-block-extension/)
- [registerIcons](./api/register-icons/)

## Components

- [ClipboardButton](./components/clipboard-button/)
- [ColorSettings](./components//clipboard-button/)
- [ContentPicker](./components//content-picker/)
- [ContentSearch](./components/content-search/)
- [CustomBlockAppender](./components/custom-block-appender/)
- [IconPicker](./components/icon-picker/)
- [Image](./components/image/)
- [InnerBlockSlider](./components/inner-block-slider/)
- [IsAdmin](./components//is-admin/)
- [MediaToolbar](./components/media-toolbar/)
- [Optional](./components/optional/)

## Hooks

- [useFilteredList](./hooks/use-filtered-list)
- [useHasSelectedInnerBlock](./hooks/use-has-selected-inner-block/)
- [useIcons](./hooks/use-icons/)
- [useMedia](./hooks/use-media/)
- [useRequestData](./hooks/use-request-data/)

## Stores

- [iconStore](./stores/icons)

## Support Level

__Active:__ 10up is actively working on this, and we expect to continue work for the foreseeable future including keeping tested up to the most recent version of WordPress.  Bug reports, feature requests, questions, and pull requests are welcome.

## Contributing

Please read [CODE_OF_CONDUCT.md](https://github.com/10up/block-components/blob/develop/CODE_OF_CONDUCT.md) for details on our code of conduct and [CONTRIBUTING.md](https://github.com/10up/block-components/blob/develop/CONTRIBUTING.md) for details on the process for submitting pull requests to us.

## Like what you see?

<a href="http://10up.com/contact/"><img src="https://10up.com/uploads/2016/10/10up-Github-Banner.png" alt="Work with 10up, we create amazing websites and tools that make content management simple and fun using open source tools and platforms"></a>
