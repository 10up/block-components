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
- [ColorSettings](./components/color-settings/)
- [ContentPicker](./components/content-picker/)
- [ContentSearch](./components/content-search/)
- [CustomBlockAppender](./components/custom-block-appender/)
- [IconPicker](./components/icon-picker/)
- [Image](./components/image/)
- [Link](./components/link/)
- [InnerBlockSlider `DEPRECATED`](./components/inner-block-slider/)
- [IsAdmin](./components//is-admin/)
- [MediaToolbar](./components/media-toolbar/)
- [Optional](./components/optional/)
- [Repeater](./components/repeater/)
- [RichTextCharacterLimit](./components/rich-text-character-limit)

### Post related Components

These components read/write information from the global post object or a `PostContext`.

- [PostAuthor](./components/post-author/)
- [PostCategoryList](./components/post-category-list/)
- [PostContext](./components/post-context/)
- [PostDate](./components/post-date)
- [PostExcerpt](./components/post-excerpt/)
- [PostFeaturedImage](./components/post-featured-image/)
- [PostPrimaryCategory](./components/post-primary-category/)
- [PostPrimaryTerm](./components/post-primary-term/)
- [PostTermList](./components/post-term-list/)
- [PostTitle](./components/post-title/)
- [PostMeta](./components/post-meta/)

## Hooks

- [useFilteredList](./hooks/use-filtered-list)
- [useHasSelectedInnerBlock](./hooks/use-has-selected-inner-block/)
- [useIcons](./hooks/use-icons/)
- [useMedia](./hooks/use-media/)
- [useRequestData](./hooks/use-request-data/)
- [useBlockParentAttributes](./hooks/use-block-parent-attributes/)
- [useScript](./hooks/use-script/)
- [useIsPluginActive](./hooks/use-is-plugin-active/)
- [usePopover](./hooks/use-popover/)

### Post related hooks

These hooks read/write information from the global post object or a `PostContext`.

- [useAllTerms](./hooks/use-all-terms/)
- [useTaxonomy](./hooks/use-taxonomy/)
- [useIsSupportedTaxonomy](./hooks/use-is-supported-taxonomy/)
- [usePost](./hooks/use-post/)
- [usePrimaryTerm](./hooks/use-primary-term/)
- [useSelectedTermIds](./hooks/use-selected-term-ids/)
- [useSelectedTerms](./hooks/use-selected-terms/)
- [useSelectedTermsOfSavedPost](./hooks/use-selected-terms-of-saved-post/)
- [usePostMetaValue](./hooks/use-post-meta-value/)

## Stores

- [iconStore](./stores/icons)

## Support Level

__Active:__ 10up is actively working on this, and we expect to continue work for the foreseeable future including keeping tested up to the most recent version of WordPress.  Bug reports, feature requests, questions, and pull requests are welcome.

## Contributing

Please read [CODE_OF_CONDUCT.md](https://github.com/10up/block-components/blob/develop/CODE_OF_CONDUCT.md) for details on our code of conduct and [CONTRIBUTING.md](https://github.com/10up/block-components/blob/develop/CONTRIBUTING.md) for details on the process for submitting pull requests to us.

## Like what you see?

<a href="http://10up.com/contact/"><img src="https://10up.com/uploads/2016/10/10up-Github-Banner.png" alt="Work with 10up, we create amazing websites and tools that make content management simple and fun using open source tools and platforms"></a>
