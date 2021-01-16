const {nodeResolve} = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const babel = require('rollup-plugin-babel')
const json = require('@rollup/plugin-json')
const {terser} = require('rollup-plugin-terser')

const suffix = process.env.USE_POLYFILLS == 'on' ? '.polyfilled' : ''

module.exports = {
  input: 'src/index.js',
  output: [
    {
      format: 'amd',
      file: 'dist/regionist.amd' + suffix + '.js'
    },
    {
      format: 'cjs',
      file: 'dist/regionist.cjs' + suffix + '.js'
    },
    {
      format: 'es',
      file: 'dist/regionist.es' + suffix + '.js'
    },
    {
      format: 'iife',
      file: 'dist/regionist.iife' + suffix + '.js',
      name: 'Regionist'
    },
    {
      format: 'umd',
      file: 'dist/regionist.umd' + suffix + '.js',
      name: 'Regionist'
    }
  ],
  plugins: [
    nodeResolve(),
    commonjs(),
    babel(),
    json(),
    terser()
  ]
}
