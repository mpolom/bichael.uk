import path from "node:path";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import eleventySass from "@11tyrocks/eleventy-plugin-sass-lightningcss";
import bundle from "@11tyrocks/eleventy-plugin-sass-lightningcss";
import { legacyImgSize, imgSize, obsidianImgSize } from "@mdit/plugin-img-size";
import {IdAttributePlugin, InputPathToUrlTransformPlugin, HtmlBasePlugin, RenderPlugin } from "@11ty/eleventy";
import pluginNavigation from "@11ty/eleventy-navigation";

export default async function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("./src/css/core.style.css");
	eleventyConfig.addPassthroughCopy({'./node_modules/@fontsource-variable/geist/files/*.woff2': 'css/files'})
	eleventyConfig.addPassthroughCopy("./src/images");
	eleventyConfig.amendLibrary("md", (mdLib) => mdLib.use(imgSize));
	eleventyConfig.addPlugin(eleventySass);
	eleventyConfig.addPlugin(RenderPlugin);
	eleventyConfig.addPlugin(eleventyImageTransformPlugin);
	let options = {
		html: true,
	};
	eleventyConfig.addPreprocessor("drafts", "*", (data, content) => {
		if (data.draft) {
			data.title = `${data.title} (draft)`;
		}

		if(data.draft && process.env.ELEVENTY_RUN_MODE === "build") {
			return false;
		}
	});
	
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