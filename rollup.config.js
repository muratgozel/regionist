import {nodeResolve} from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import json from '@rollup/plugin-json'

const babelPresetsStandart = [
    ['@babel/env', {
        useBuiltIns: false,
        debug: false
    }]
]
const babelPresetsIife = [
    ['@babel/env', {
        useBuiltIns: 'usage',
        corejs: {version: 3, proposals: true},
        debug: false
    }]
]
const babelPlugins = [
    ['@babel/plugin-transform-runtime', {
        corejs: {version: 3, proposals: true},
        helpers: true,
        regenerator: true,
        absoluteRuntime: false
    }]
]

export default [
    {
        external: [
            /@babel\/runtime/, /core-js/, /store/, /locale-util/
        ],
        input: 'build/regionist.js',
        output: [
            {
                format: 'cjs',
                file: 'dist/regionist.cjs.js',
                sourcemap: false
            },
            {
                format: 'es',
                file: 'dist/regionist.es.js',
                sourcemap: false
            }
        ],
        plugins: [
            nodeResolve({preferBuiltins: false}),
            commonjs({sourceMap: false}),
            json(),
            babel({
                babelHelpers: 'runtime',
                babelrc: false,
                exclude: ['node_modules/**'],
                presets: babelPresetsStandart,
                plugins: babelPlugins
            })
        ]
    },
    {
        input: 'build/regionist.js',
        output: [
            {
                format: 'iife',
                name: 'regionist',
                file: 'dist/regionist.iife.js',
                sourcemap: true,
                globals: {
                    regionist: 'regionist'
                }
            }
        ],
        plugins: [
            json(),
            nodeResolve({preferBuiltins: false}),
            commonjs({sourceMap: true}),
            babel({
                babelHelpers: 'runtime',
                babelrc: false,
                exclude: ['node_modules/**'],
                presets: babelPresetsIife,
                plugins: babelPlugins
            }),
            terser({sourceMap: true})
        ]
    }
]
