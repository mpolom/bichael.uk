import { nodeResolve } from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss"; 
import copy from "rollup-plugin-copy"; 

export default [
    {
        input: "src/js/combine.js",
        output: {
            file: "src/js/minified/index.bundle.js",
            sourcemap: false,
        },
        plugins: [ 
            nodeResolve(),
            postcss({
                extract: true, // no way to move output to another folder https://github.com/egoist/rollup-plugin-postcss/issues/250
                minimize: {
                    preset: [
                        'default',
                        {
                            minifyFontValues: false,
                        },
                    ],
                },
            }),
        copy({ 
            targets: [
                {
                    src: "src/js/minified/index.bundle.css",
                    dest: "src/css",
                    rename: "fonts.bundle.css",
                },
            ],
            verbose: true,
            hook: "writeBundle",
        })
        ],
    }
];