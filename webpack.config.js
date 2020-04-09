const path = require('path')
const webpack = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const pluginConfig = require('./plugin.config')

const isProduction = process.env.NODE_ENV === 'production'
const port = 10001

module.exports = {
  entry: {
    index: './src/index.ts',
    bundle: './src/main.ts',
  },
  mode: isProduction ? 'production' : 'development',
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.mjs', '.js', '.jsx', '.json'],
  },
  devServer: {
    port,
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          transpileOnly: true,
          compilerOptions: {
            jsx: 'react',
          },
        },
      },
    ],
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.BUNDLE_URL': JSON.stringify(
        isProduction ? pluginConfig.bundleUrl : `http://localhost:${port}/bundle.js`,
      ),
    }),
  ],
}
