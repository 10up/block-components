export type Icon = {
	name: string;
	source: string;
	iconSet: string;
	label: string;
};

export type IconSet = {
	name: string;
	label: string;
	icons: Icon[];
};

export enum ActionTypes {
	REGISTER_ICON_SET = 'REGISTER_ICON_SET',
	REMOVE_ICON_SET = 'REMOVE_ICON_SET',
}