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
 * A single icon record from the WordPress 7.1+ core icon store
 * (`getEntityRecords('root','icon')`). `name` is prefixed with the
 * collection slug (e.g. `example/smiley`) and `content` holds the raw SVG.
 */
export type CoreIconRecord = {
	name: string;
	label: string;
	content: string;
	collection: string;
};
