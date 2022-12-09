/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import PropTypes from 'prop-types';
import { AUTHOR_CONTEXT } from './context';

/**
 * @typedef {object} Author
 * @property {object} author
 * @property {object<string, string>} author.avatar_urls
 * @property {string} author.description
 * @property {string} author.email
 * @property {string} author.first_name
 * @property {number} author.id
 * @property {string} author.last_name
 * @property {string} author.link
 * @property {string} author.name
 * @property {string} author.nickname
 * @property {string} author.registered_date
 * @property {string} author.slug
 * @property {string} author.url
 */

export const Name = (props) => {
	const { as: Component = 'span', ...rest } = props;

	/**
	 * @type {Author}
	 */
	const { name, link } = useContext(AUTHOR_CONTEXT);

	const wrapperProps = { ...rest };

	if (Component === 'a' && link) {
		wrapperProps.href = link;
	}

	return <Component {...wrapperProps}>{name}</Component>;
};

Name.propTypes = {
	as: PropTypes.string,
};

Name.defaultProps = {
	as: 'span',
};

export const FirstName = (props) => {
	const { as: Component = 'span', ...rest } = props;

	/**
	 * @type {Author}
	 */
	const { first_name: firstName } = useContext(AUTHOR_CONTEXT);

	return <Component {...rest}>{firstName}</Component>;
};

FirstName.propTypes = {
	as: PropTypes.string,
};

FirstName.defaultProps = {
	as: 'span',
};

export const LastName = (props) => {
	const { as: Component = 'span', ...rest } = props;

	/**
	 * @type {Author}
	 */
	const { last_name: lastName } = useContext(AUTHOR_CONTEXT);

	return <Component {...rest}>{lastName}</Component>;
};

LastName.propTypes = {
	as: PropTypes.string,
};

LastName.defaultProps = {
	as: 'span',
};

function useDefaultAvatar() {
	const { avatarURL: defaultAvatarUrl } = useSelect((select) => {
		const { getSettings } = select(blockEditorStore);
		const { __experimentalDiscussionSettings } = getSettings();
		return __experimentalDiscussionSettings;
	});
	return defaultAvatarUrl;
}

export const Avatar = (props) => {
	const { as: Component = 'img', ...rest } = props;

	/**
	 * @type {Author}
	 */
	const authorDetails = useContext(AUTHOR_CONTEXT);

	const avatarUrls = authorDetails?.avatar_urls ? Object.values(authorDetails.avatar_urls) : null;
	const defaultAvatar = useDefaultAvatar();

	const avatarSourceUrl = avatarUrls ? avatarUrls[avatarUrls.length - 1] : defaultAvatar;

	return <Component src={avatarSourceUrl} {...rest} />;
};

Avatar.propTypes = {
	as: PropTypes.string,
};

Avatar.defaultProps = {
	as: 'img',
};

export const Bio = (props) => {
	const { as: Component = 'p', ...rest } = props;

	/**
	 * @type {Author}
	 */
	const { description } = useContext(AUTHOR_CONTEXT);

	return <Component {...rest}>{description}</Component>;
};

Bio.propTypes = {
	as: PropTypes.string,
};

Bio.defaultProps = {
	as: 'p',
};

export const Email = (props) => {
	const { ...rest } = props;

	/**
	 * @type {Author}
	 */
	const { email } = useContext(AUTHOR_CONTEXT);

	return (
		<a href={`mailto:${email}`} {...rest}>
			{email}
		</a>
	);
};
