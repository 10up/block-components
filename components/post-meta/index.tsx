import { RichText } from '@wordpress/block-editor';
import { __experimentalNumberControl as NumberControl, ToggleControl } from '@wordpress/components';
import type { ToggleControlProps } from '@wordpress/components/src/toggle-control/types';
import { usePostMetaValue, useIsSupportedMetaField } from '../../hooks';
import { toSentence } from './utilities';

interface PostMetaProps {
	/**
	 * The meta key to use.
	 */
	metaKey: string;

	/**
	 * The children render prop.
	 */
	children?: ((metaValue: any, setMetaValue: (value: any) => void) => React.ReactNode);
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

	return <MetaString {...props} />;
};

interface MetaStringProps {
	/**
	 * The meta key to use.
	 */
	metaKey: string;

	/**
	 * A valid HTML tag.
	 */
	tagName?: keyof JSX.IntrinsicElements;
}

const MetaString: React.FC<MetaStringProps> = (props) => {
	const { metaKey, tagName = 'p' } = props;
	const [metaValue, setMetaValue] = usePostMetaValue(metaKey);

	return <RichText value={metaValue} onChange={setMetaValue} tagName={tagName} {...props} />;
};

interface MetaNumberProps {
	/**
	 * The meta key to use.
	 */
	metaKey: string;
}

const MetaNumber: React.FC<MetaNumberProps> = (props) => {
	const { metaKey } = props;
	const [metaValue, setMetaValue] = usePostMetaValue(metaKey);

	return <NumberControl value={metaValue} onChange={setMetaValue} {...props} />;
};

interface MetaBooleanProps extends Pick<ToggleControlProps, 'label'> {
	/**
	 * The meta key to use.
	 */
	metaKey: string;
}

const MetaBoolean: React.FC<MetaBooleanProps> = (props) => {
	const { metaKey } = props;
	const [metaValue, setMetaValue] = usePostMetaValue(metaKey);

	return <ToggleControl checked={metaValue} onChange={setMetaValue} {...props} />;
};

PostMeta.String = MetaString;
PostMeta.Number = MetaNumber;
PostMeta.Boolean = MetaBoolean;
