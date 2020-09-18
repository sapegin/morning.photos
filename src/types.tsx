export type Photo = {
	name: string;
	slug: string;
	title: string;
	caption?: string;
	location?: string;
	modified: number;
	formattedDate?: string;
	keywords: string[];
	width: number;
	height: number;
	color: string;
};
