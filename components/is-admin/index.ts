import { useSelect } from '@wordpress/data';

interface IsAdminProps {
	/**
	 * Fallback component.
	 */
	fallback: React.ReactNode | null;

	/**
	 * Child component.
	 */
	children: React.ReactNode;
}

/**
 * IsAdmin
 *
 * A wrapper component that checks wether the current user has admin capabilities
 * and only returns the child components if the user is an admin. You can pass a
 * fallback component via the fallback prop.
 */
export const IsAdmin: React.FC<IsAdminProps> = ({
	fallback = null,
	children,
}): null | React.ReactNode => {
	const hasAdminPermissions: boolean = useSelect(
		(select) => select('core').canUser('read', 'users?roles=1'),
		[],
	);
	return hasAdminPermissions ? children : fallback;
};
