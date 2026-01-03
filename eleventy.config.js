import path from "node:path";
import * as sass from "sass";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";

export default async function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css/core.style.css");

    eleventyConfig.addExtension("scss", {
		outputFileExtension: "css",

		// opt-out of Eleventy Layouts
		useLayouts: false,

		compile: async function (inputContent, inputPath) {
			let parsed = path.parse(inputPath);
			// Don’t compile file names that start with an underscore
			if(parsed.name.startsWith("_")) {
				return;
			}

			let result = sass.compileString(inputContent, {
				loadPaths: [
					parsed.dir || ".",
					this.config.dir.includes,
				]
			});

			// Map dependencies for incremental builds
			this.addDependencies(inputPath, result.loadedUrls);

			return async (data) => {
				return result.css;
			};
		},
	});
	eleventyConfig.addPassthroughCopy("src/css/fonts");
	eleventyConfig.addPassthroughCopy("src/images");
	eleventyConfig.addPlugin(eleventyImageTransformPlugin);
	eleventyConfig.addTemplateFormats("scss")
};

// This named export is optional
export const config = {

  dir: {
    input: "src",
    output: "dist",
    includes: "layouts",
	data: "data"
  }
};