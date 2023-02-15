import { __ } from '@wordpress/i18n';
import { DateTimePicker } from '@wordpress/components';
import { getSettings, dateI18n } from '@wordpress/date';
import { useEntityProp } from '@wordpress/core-data';
import PropTypes from 'prop-types';
import { usePopover } from '../../hooks/use-popover';
import { usePost } from '../../hooks';

export const PostDatePicker = ({ date, setDate }) => {
	const settings = getSettings();
	// To know if the current time format is a 12 hour time, look for "a".
	// Also make sure this "a" is not escaped by a "/".
	const is12Hour = /a(?!\\)/i.test(
		settings.formats.time
			.toLowerCase() // Test only for the lower case "a".
			.replace(/\\\\/g, '') // Replace "//" with empty strings.
			.split('')
			.reverse()
			.join(''), // Reverse the string and test for "a" not followed by a slash.
	);

	return <DateTimePicker currentDate={date} onChange={setDate} is12Hour={is12Hour} />;
};

PostDatePicker.propTypes = {
	date: PropTypes.string.isRequired,
	setDate: PropTypes.func.isRequired,
};

export const PostDate = (props) => {
	const { placeholder, format, ...rest } = props;

	const { postId, postType, isEditable } = usePost();

	const [date, setDate] = useEntityProp('postType', postType, 'date', postId);
	const [siteFormat] = useEntityProp('root', 'site', 'date_format');
	const settings = getSettings();
	const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

	const resolvedFormat = format || siteFormat || settings.formats.date;

	const { toggleProps, Popover } = usePopover();

	const timeString = dateI18n(resolvedFormat, date, timezone) || placeholder;

	let parentProps = { ...rest };

	if (isEditable) {
		parentProps = {
			...toggleProps,
			...parentProps,
		};
	}

	return (
		<>
			<time
				dateTime={dateI18n('c', date, timezone)}
				pubdate={dateI18n('c', date, timezone)}
				itemProp="datePublished"
				{...parentProps}
			>
				{timeString}
			</time>
			{isEditable && (
				<Popover>
					<PostDatePicker date={date} setDate={setDate} />
				</Popover>
			)}
		</>
	);
};

PostDate.propTypes = {
	placeholder: PropTypes.string,
	format: PropTypes.string,
};

PostDate.defaultProps = {
	placeholder: __('No date set', 'tenup'),
	format: undefined,
};
