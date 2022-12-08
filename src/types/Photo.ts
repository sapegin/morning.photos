export interface Photo {
	name: string;
	title: string;
	slug: string;
	caption?: string;
	location?: string;
	modified: number;
	timestamp: number;
	formattedDate?: string;
	keywords: string[];
	width: number;
	height: number;
	color: string;
}
