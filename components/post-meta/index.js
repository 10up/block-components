import { RichText } from '@wordpress/block-editor';
import { __experimentalNumberControl as NumberControl, ToggleControl } from '@wordpress/components';
import PropTypes from 'prop-types';
import { usePostMetaValue, useIsSupportedMetaField } from '../../hooks';
import { toSentence } from './utilities';

export const PostMeta = (props) => {
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

PostMeta.propTypes = {
	metaKey: PropTypes.string.isRequired,
};

const MetaString = (props) => {
	const { metaKey, tagName = 'p' } = props;
	const [metaValue, setMetaValue] = usePostMetaValue(metaKey);

	return <RichText value={metaValue} onChange={setMetaValue} tagName={tagName} {...props} />;
};

MetaString.propTypes = {
	metaKey: PropTypes.string.isRequired,
	tagName: PropTypes.string,
};

MetaString.defaultProps = {
	tagName: 'p',
};

const MetaNumber = (props) => {
	const { metaKey } = props;
	const [metaValue, setMetaValue] = usePostMetaValue(metaKey);

	return <NumberControl value={metaValue} onChange={setMetaValue} {...props} />;
};

MetaNumber.propTypes = {
	metaKey: PropTypes.string.isRequired,
};

const MetaBoolean = (props) => {
	const { metaKey } = props;
	const [metaValue, setMetaValue] = usePostMetaValue(metaKey);

	return <ToggleControl checked={metaValue} onChange={setMetaValue} {...props} />;
};

MetaBoolean.propTypes = {
	metaKey: PropTypes.string.isRequired,
};

PostMeta.String = MetaString;
PostMeta.Number = MetaNumber;
PostMeta.Boolean = MetaBoolean;
