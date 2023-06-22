import { createContext } from '@wordpress/element';

export type PostTermContextType = {
	link?: string;
	name?: string;
}

export const PostTermContext = createContext<PostTermContextType>({
	link: undefined,
	name: undefined,
});
