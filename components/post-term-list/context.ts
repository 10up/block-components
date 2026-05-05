import { createContext } from '@wordpress/element';
import { WP_REST_API_Term } from 'wp-types';

const DEFAULT_TERM: WP_REST_API_Term = {
	id: 0,
	name: '',
	link: '',
	slug: '',
	count: 0,
	description: '',
	parent: 0,
	taxonomy: '',
	meta: [],
	_links: {},
};

export const PostTermContext = createContext<WP_REST_API_Term>(DEFAULT_TERM);
