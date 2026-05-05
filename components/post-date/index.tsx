import { __ } from '@wordpress/i18n';
import { DateTimePicker } from '@wordpress/components';
import { getSettings, dateI18n } from '@wordpress/date';
import { useEntityProp } from '@wordpress/core-data';
import type { DateSettings } from '@wordpress/date';
import { usePopover } from '../../hooks/use-popover';
import { usePost } from '../../hooks';

interface PostDatePickerProps {
	date?: string;
	setDate: (date: string | null) => void;
}

export const PostDatePicker: React.FC<PostDatePickerProps> = ({ date, setDate }) => {
	const settings: DateSettings = getSettings();
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

interface PostDateProps {
	/**
	 * The placeholder to show when no date is set.
	 */
	placeholder: string;

	/**
	 * The date format to use.
	 */
	format?: string;

	/**
	 * The timezone to use for formatting.
	 * When not provided, dateI18n falls back to the WordPress site timezone.
	 */
	timezone?: string;

	/**
	 * Remaining props to pass to the time element.
	 */
	[key: string]: unknown;
}

export const PostDate: React.FC<PostDateProps> = ({
	placeholder = __('No date set', 'tenup'),
	format,
	timezone,
	...rest
}) => {
	const { postId, postType, isEditable } = usePost();

	const [date, setDate] = useEntityProp('postType', postType, 'date', postId as string);
	const [siteFormat] = useEntityProp('root', 'site', 'date_format');
	const settings: DateSettings = getSettings();

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
				itemProp="datePublished"
				{...parentProps}
			>
				{timeString}
			</time>
			{isEditable && (
				<Popover>
					<PostDatePicker date={date} setDate={(date: string | null) => setDate(date)} />
				</Popover>
			)}
		</>
	);
};
