import { useSelect } from '@wordpress/data';

/**
 * IsAdmin
 *
 * A wrapper component that checks wether the current user has admin capabilities
 * and only returns the child components if the user is an admin. You can pass a
 * fallback component via the fallback prop.
 *
 * @param {object} props react props
 * @param {*} props.fallback fallback component
 * @param {*} props.children child components
 * @returns {*}
 */
export const IsAdmin = ({ fallback = null, children }) => {
	const hasAdminPermissions = useSelect(
		(select) => select('core').canUser('read', 'users?roles=1'),
		[],
	);
	return hasAdminPermissions ? children : fallback;
};
