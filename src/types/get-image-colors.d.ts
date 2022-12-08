// HACK: These types are very incomplete and only cover what's used on the project
// @types/get-image-colors doesn't seem to work at all
declare module 'get-image-colors' {
	interface Options {
		type: string;
		count: number;
	}

	interface Color {
		hex: () => string;
	}

	function getImageColors(buffer: Buffer, options: Options): Promise<Color[]>;
	export = getImageColors;
}
