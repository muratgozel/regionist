const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const babel = require('rollup-plugin-babel')
const json = require('@rollup/plugin-json')
const {terser} = require('rollup-plugin-terser')

const suffix = process.env.USE_POLYFILLS == 'on' ? '.polyfilled' : ''

module.exports = {
  external: [
    'local-storage-pro', 'locale-util'
  ],
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
      name: 'Regionist',
      globals: {
        'local-storage-pro': 'localStoragePro',
        'locale-util': 'LocaleUtil'
      }
    },
    {
      format: 'umd',
      file: 'dist/regionist.umd' + suffix + '.js',
      name: 'Regionist',
      globals: {
        'local-storage-pro': 'localStoragePro',
        'locale-util': 'LocaleUtil'
      }
    }
  ],
  plugins: [
    resolve(),
    commonjs(),
    babel(),
    json(),
    terser({sourcemap: false})
  ]
}
