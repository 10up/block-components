import { useSelect } from '@wordpress/data';

/**
 * IsAdmin
 *
 * A wrapper component that checks wether the current user has admin capabilities
 * and only returns the child omponents if the user is an admin. You can pass a
 * fallback component via the fallback prop.
 *
 * @param {Object} props react props
 * @param props.fallback
 * @param props.children
 */
export function IsAdmin({ fallback = null, children }) {
	const hasAdminPermissions = useSelect(
		(select) => select('core').canUser('read', 'users?roles=1'),
		[],
	);
	return hasAdminPermissions ? children : fallback;
}
