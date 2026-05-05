import { RichText } from '@wordpress/block-editor';
import { __experimentalNumberControl as NumberControl, ToggleControl } from '@wordpress/components';
import type { ToggleControlProps } from '@wordpress/components/src/toggle-control/types';
import { usePostMetaValue, useIsSupportedMetaField, usePost } from '../../hooks';
import { toSentence } from './utilities';

interface MetaStringProps
	extends Omit<
		React.ComponentPropsWithoutRef<typeof RichText>,
		'value' | 'onChange' | 'multiline'
	> {
	/**
	 * The meta key to use.
	 */
	metaKey: string;
}

const MetaString: React.FC<MetaStringProps> = (props) => {
	const { metaKey, tagName = 'p', ...rest } = props;
	const [metaValue, setMetaValue] = usePostMetaValue<string>(metaKey);
	const { isEditable } = usePost();

	if (!isEditable) {
		return <RichText.Content value={metaValue ?? ''} tagName={tagName} {...props} />;
	}

	return (
		<RichText
			value={metaValue ?? ''}
			onChange={(value: string) => setMetaValue(value)}
			tagName={tagName}
			{...rest}
		/>
	);
};

interface MetaNumberProps {
	/**
	 * The meta key to use.
	 */
	metaKey: string;
}

const MetaNumber: React.FC<MetaNumberProps> = (props) => {
	const { metaKey, ...rest } = props;
	const [metaValue, setMetaValue] = usePostMetaValue<number>(metaKey);
	const { isEditable } = usePost();

	return (
		<NumberControl
			value={metaValue}
			onChange={(value) => setMetaValue(parseInt(value ?? '', 10))}
			disabled={!isEditable}
			{...rest}
		/>
	);
};

interface MetaBooleanProps extends Pick<ToggleControlProps, 'label'> {
	/**
	 * The meta key to use.
	 */
	metaKey: string;
}

const MetaBoolean: React.FC<MetaBooleanProps> = (props) => {
	const { metaKey, ...rest } = props;
	const [metaValue, setMetaValue] = usePostMetaValue<boolean>(metaKey);
	const { isEditable } = usePost();

	return (
		<ToggleControl
			checked={metaValue}
			onChange={setMetaValue}
			disabled={!isEditable}
			{...rest}
		/>
	);
};

interface PostMetaProps {
	/**
	 * The meta key to use.
	 */
	metaKey: string;

	/**
	 * The children render prop.
	 */
	children?: (
		metaValue: any,
		setMetaValue: (value: any) => void,
	) => React.ReactNode | React.ReactNode;

	/**
	 * Additional props to pass to the component.
	 */
	[key: string]: unknown;
}

export const PostMeta: React.FC<PostMetaProps> & {
	String: React.FC<MetaStringProps>;
	Number: React.FC<MetaNumberProps>;
	Boolean: React.FC<MetaBooleanProps>;
} = (props) => {
	const { metaKey, children } = props;
	const [isSupported] = useIsSupportedMetaField(metaKey);
	const [metaValue, setMetaValue] = usePostMetaValue(metaKey);
	const metaValueType = typeof metaValue;

	if (!isSupported) {
		return (
			<p className="tenup-block-components-post-meta-placeholder">{`${metaKey} - Meta Value`}</p>
		);
	}

	if (typeof children === 'function') {
		return children(metaValue, setMetaValue);
	}

	if (metaValueType === 'number') {
		return <MetaNumber {...props} />;
	}

	if (metaValueType === 'boolean') {
		return <MetaBoolean {...props} label={toSentence(metaKey)} />;
	}

	// @ts-ignore-next-line - The types here are not accurate.
	return <MetaString {...props} />;
};

PostMeta.String = MetaString;
PostMeta.Number = MetaNumber;
PostMeta.Boolean = MetaBoolean;
