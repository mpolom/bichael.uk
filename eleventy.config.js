import path from "node:path";
import { eleventyImageTransformPlugin } from "@11ty/eleventy-img";
import markdownIt from "markdown-it";
import eleventySass from "@11tyrocks/eleventy-plugin-sass-lightningcss";
import bundle from "@11tyrocks/eleventy-plugin-sass-lightningcss";


export default async function(eleventyConfig) {
	eleventyConfig.addPassthroughCopy("src/css/core.style.css");
	eleventyConfig.addPassthroughCopy({'./node_modules/@fontsource-variable/geist/files/*.woff2': 'css/files'})
	eleventyConfig.addPassthroughCopy("src/images");
	eleventyConfig.addPlugin(eleventySass);
	eleventyConfig.addPlugin(eleventyImageTransformPlugin);
	let options = {
		html: true,
	};
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