import { useSelect } from '@wordpress/data';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { useAuthor } from './context';

interface NameProps {
	tagName?: keyof JSX.IntrinsicElements;
	[key: string]: unknown;
}

export const Name: React.FC<NameProps> = (props) => {
	const { tagName: TagName = 'span', ...rest } = props;
	const { name, link } = useAuthor();

	const wrapperProps = { ...rest };

	if (TagName === 'a' && link) {
		wrapperProps.href = link;
	}

	return <TagName {...wrapperProps}>{name}</TagName>;
};

interface FirstNameProps {
	tagName?: keyof JSX.IntrinsicElements;
	[key: string]: unknown;
}

export const FirstName: React.FC<FirstNameProps> = (props) => {
	const { tagName: TagName = 'span', ...rest } = props;
	const { first_name: firstName } = useAuthor();

	return <TagName {...rest}>{firstName}</TagName>;
};

interface LastNameProps {
	tagName?: keyof JSX.IntrinsicElements;
	[key: string]: unknown;
}

export const LastName: React.FC<LastNameProps> = (props) => {
	const { tagName: TagName = 'span', ...rest } = props;
	const { last_name: lastName } = useAuthor();

	return <TagName {...rest}>{lastName}</TagName>;
};

function useDefaultAvatar(): string {
	const { avatarURL: defaultAvatarUrl } = useSelect((select) => {
		// @ts-ignore-next-line The type definitions for the block editor store are incomplete.
		const { getSettings } = select(blockEditorStore);
		const { __experimentalDiscussionSettings } = getSettings();
		return __experimentalDiscussionSettings;
	}, []);
	return defaultAvatarUrl;
}

interface AvatarProps {
	[key: string]: unknown;
}

export const Avatar: React.FC<AvatarProps> = (props) => {
	const { ...rest } = props;
	const authorDetails = useAuthor();

	const avatarUrls = authorDetails?.avatar_urls ? Object.values(authorDetails.avatar_urls) : null;
	const defaultAvatar = useDefaultAvatar();

	const avatarSourceUrl = avatarUrls ? avatarUrls[avatarUrls.length - 1] : defaultAvatar;

	// eslint-disable-next-line jsx-a11y/alt-text
	return <img src={avatarSourceUrl} {...rest} />;
};

interface BioProps {
	tagName?: keyof JSX.IntrinsicElements;
	[key: string]: unknown;
}

export const Bio: React.FC<BioProps> = (props) => {
	const { tagName: TagName = 'p', ...rest } = props;
	const { description } = useAuthor();

	return <TagName {...rest}>{description}</TagName>;
};

interface EmailProps {
	[key: string]: unknown;
}

export const Email: React.FC<EmailProps> = (props) => {
	const { ...rest } = props;
	const { email } = useAuthor();

	return (
		<a href={`mailto:${email}`} {...rest}>
			{email}
		</a>
	);
};
