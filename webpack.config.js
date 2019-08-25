const path = require('path')

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development'

  return {
    entry: './src/index.js',
    output: {
      filename: 'markdown-it-color.js',
      path: path.resolve(__dirname, 'dist'),
      library: 'markdown-it-color',
      libraryTarget: 'umd',
      globalObject: 'this',
    },
    mode: isDev ? 'development' : 'production',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
      ],
    },
  }
}
