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
	const { tagName: TagName = 'span', ...rest } = props;

	/**
	 * @type {Author}
	 */
	const { name, link } = useContext(AUTHOR_CONTEXT);

	const wrapperProps = { ...rest };

	if (TagName === 'a' && link) {
		wrapperProps.href = link;
	}

	return <TagName {...wrapperProps}>{name}</TagName>;
};

Name.propTypes = {
	tagName: PropTypes.string,
};

Name.defaultProps = {
	tagName: 'span',
};

export const FirstName = (props) => {
	const { tagName: TagName = 'span', ...rest } = props;

	/**
	 * @type {Author}
	 */
	const { first_name: firstName } = useContext(AUTHOR_CONTEXT);

	return <TagName {...rest}>{firstName}</TagName>;
};

FirstName.propTypes = {
	tagName: PropTypes.string,
};

FirstName.defaultProps = {
	tagName: 'span',
};

export const LastName = (props) => {
	const { tagName: TagName = 'span', ...rest } = props;

	/**
	 * @type {Author}
	 */
	const { last_name: lastName } = useContext(AUTHOR_CONTEXT);

	return <TagName {...rest}>{lastName}</TagName>;
};

LastName.propTypes = {
	tagName: PropTypes.string,
};

LastName.defaultProps = {
	tagName: 'span',
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
	const { ...rest } = props;

	/**
	 * @type {Author}
	 */
	const authorDetails = useContext(AUTHOR_CONTEXT);

	const avatarUrls = authorDetails?.avatar_urls ? Object.values(authorDetails.avatar_urls) : null;
	const defaultAvatar = useDefaultAvatar();

	const avatarSourceUrl = avatarUrls ? avatarUrls[avatarUrls.length - 1] : defaultAvatar;

	return <img src={avatarSourceUrl} {...rest} />;
};

export const Bio = (props) => {
	const { tagName: TagName = 'p', ...rest } = props;

	/**
	 * @type {Author}
	 */
	const { description } = useContext(AUTHOR_CONTEXT);

	return <TagName {...rest}>{description}</TagName>;
};

Bio.propTypes = {
	tagName: PropTypes.string,
};

Bio.defaultProps = {
	tagName: 'p',
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
