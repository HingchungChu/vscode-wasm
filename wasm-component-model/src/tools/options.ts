/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

export type Options = {
	help: boolean;
	version: boolean;
	outDir: string | undefined;
	package: RegExp;
	file: string | undefined;
};

export type ResolvedOptions = Required<Options> & { file: string; outDir: string };

export namespace Options {
	export const defaults: Options = {
		help: false,
		version: false,
		outDir: undefined,
		package: /.*/,
		file: undefined
	};

	export function validate(options: Options): options is ResolvedOptions {
		if (!options.file) {
			process.stderr.write('Missing file argument.\n');
			return false;
		}
		if (!options.outDir) {
			process.stderr.write('Missing outDir argument.\n');
			return false;
		}
		return true;
	}
}