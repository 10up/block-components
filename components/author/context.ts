import { createContext, useContext } from '@wordpress/element';

export type Author = {
	avatar_urls: Record<string, string>;
	description: string;
	email: string;
	first_name: string;
	id: number;
	last_name: string;
	link: string;
	name: string;
	nickname: string;
	registered_date: string;
	slug: string;
	url: string;
};

export const AuthorContext = createContext<Author>({
	avatar_urls: {},
	description: '',
	email: '',
	first_name: '',
	id: 0,
	last_name: '',
	link: '',
	name: '',
	nickname: '',
	registered_date: '',
	slug: '',
	url: '',
});

export const useAuthor = () => {
	return useContext(AuthorContext);
};
