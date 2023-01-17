import { useSelect } from '@wordpress/data';
import { store as coreStore } from '@wordpress/core-data';

type IsAdminProps = {
	fallback?: React.ReactNode;
	children: React.ReactNode;
};

/**
 * IsAdmin
 *
 * A wrapper component that checks wether the current user has admin capabilities
 * and only returns the child components if the user is an admin. You can pass a
 * fallback component via the fallback prop.
 */
export const IsAdmin = ({ fallback = null, children }: IsAdminProps) => {
	const hasAdminPermissions = useSelect(
		(select) => select(coreStore).canUser('read', 'users?roles=1'),
		[],
	);
	return hasAdminPermissions ? children : fallback;
};
