import React from 'react';
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';
import { Icon, lock } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';

import { useMaxInnerBlocks } from '@10up/block-components';

interface BlockAttributes {
	max: number;
	noticeType: 'snackbar' | 'default';
	isDismissible: boolean;
	explicitDismiss: boolean;
	iconMode: 'default' | 'custom' | 'none';
	withUndo: boolean;
}

interface BlockEditProps {
	clientId: string;
	attributes: BlockAttributes;
	setAttributes: (attrs: Partial<BlockAttributes>) => void;
}

const ALLOWED_BLOCKS = ['core/paragraph', 'core/heading', 'core/image'];
const TEMPLATE: Array<[string, Record<string, unknown>]> = [
	['core/paragraph', { placeholder: 'Add a child block...' }],
];

const customIcon = <Icon icon={lock} fill="currentColor" />;

export const BlockEdit = ({ clientId, attributes, setAttributes }: BlockEditProps) => {
	const { max, noticeType, isDismissible, explicitDismiss, iconMode, withUndo } = attributes;

	const resolvedIcon = (() => {
		if (iconMode === 'none') return null;
		if (iconMode === 'custom') return customIcon;
		return undefined;
	})();

	const noticeOptions: Record<string, unknown> = {
		type: noticeType,
		isDismissible,
		explicitDismiss,
	};

	if (resolvedIcon !== undefined) {
		noticeOptions.icon = resolvedIcon;
	}

	if (withUndo) {
		noticeOptions.actions = [
			{
				label: __('Run action', 'example'),
				onClick: () => {
					// eslint-disable-next-line no-alert
					window.alert(__('Action clicked — verifies noticeOptions.actions wiring.', 'example'));
				},
			},
		];
	}

	useMaxInnerBlocks({
		clientId,
		max,
		message: __(
			`This block accepts at most ${max} children — extras will be removed.`,
			'example',
		),
		noticeOptions,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody title={__('Max Inner Blocks Settings', 'example')}>
					<RangeControl
						label={__('Max children', 'example')}
						min={1}
						max={5}
						value={max}
						onChange={(value) => setAttributes({ max: value ?? 1 })}
						__next40pxDefaultSize
					/>
					<SelectControl
						label={__('Notice type', 'example')}
						value={noticeType}
						options={[
							{ label: 'Snackbar', value: 'snackbar' },
							{ label: 'Default', value: 'default' },
						]}
						onChange={(value) =>
							setAttributes({ noticeType: value as BlockAttributes['noticeType'] })
						}
						__next40pxDefaultSize
					/>
					<SelectControl
						label={__('Icon', 'example')}
						value={iconMode}
						options={[
							{ label: 'Default', value: 'default' },
							{ label: 'Custom', value: 'custom' },
							{ label: 'None', value: 'none' },
						]}
						onChange={(value) =>
							setAttributes({ iconMode: value as BlockAttributes['iconMode'] })
						}
						__next40pxDefaultSize
					/>
					<ToggleControl
						label={__('Dismissible', 'example')}
						checked={isDismissible}
						onChange={(value) => setAttributes({ isDismissible: value })}
						__next40pxDefaultSize
					/>
					<ToggleControl
						label={__('Explicit dismiss (sticky)', 'example')}
						checked={explicitDismiss}
						onChange={(value) => setAttributes({ explicitDismiss: value })}
						__next40pxDefaultSize
					/>
					<ToggleControl
						label={__('Include action button', 'example')}
						checked={withUndo}
						onChange={(value) => setAttributes({ withUndo: value })}
						__next40pxDefaultSize
					/>
				</PanelBody>
			</InspectorControls>
			<div
				style={{
					border: '1px dashed #999',
					padding: '1rem',
					borderRadius: '4px',
				}}
			>
				<p style={{ margin: '0 0 1rem', fontSize: '0.85em', color: '#555' }}>
					{__(
						`Max children: ${max}. Try adding more than ${max} children — extras will be removed.`,
						'example',
					)}
				</p>
				<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} template={TEMPLATE} />
			</div>
		</>
	);
};
