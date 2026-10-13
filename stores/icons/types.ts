export type Icon = {
	source: string;
	name: string;
	label: string;
};

export type IconSet = {
	name: string;
	icons: Icon[];
	label: string;
};

/**
 * An icon record from the WordPress core Icons API (WP 7.0+), as returned by
 * `GET /wp/v2/icons` and the core-data `root/icon` entity.
 */
export type CoreIconRecord = {
	/**
	 * Fully qualified name, `collection/icon-name`.
	 */
	name: string;
	label: string;
	/**
	 * SVG markup. Core strips the root `fill`, so it relies on CSS for colour.
	 */
	content: string;
	/**
	 * Collection slug (WP 7.1+). Falls back to the name's prefix when missing.
	 */
	collection?: string;
};

/**
 * An icon collection record from the WordPress core Icons API (WP 7.1+), as
 * returned by `GET /wp/v2/icon-collections` and the `root/iconCollection` entity.
 */
export type CoreIconCollectionRecord = {
	slug: string;
	label: string;
	description?: string;
};
