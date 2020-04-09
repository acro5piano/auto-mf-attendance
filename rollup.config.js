import typescript from '@rollup/plugin-typescript'
import replace from 'rollup-plugin-replace'
import { uglify } from 'rollup-plugin-uglify'
import serve from 'rollup-plugin-serve'
import pluginConfig from './plugin.config'

const isProduction = process.env.NODE_ENV === 'production'

const plugins = [
  typescript(),
  isProduction && uglify(),
  !isProduction && serve('build'),
  replace({
    'process.env.BUNDLE_URL': JSON.stringify(
      isProduction ? pluginConfig.bundleUrl : 'http://localhost:10001/bundle.js',
    ),
  }),
]

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'build/index.js',
      name: 'index.js',
      format: 'iife',
    },
    plugins,
  },
  {
    input: 'src/main.ts',
    output: {
      file: 'build/bundle.js',
      name: 'bundle.js',
      format: 'iife',
    },
    plugins,
  },
]
