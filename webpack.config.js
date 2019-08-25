const path = require('path')

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development'

  return {
    entry: './src/index.js',
    output: {
      filename: 'markdown-it-color.min.js',
      path: path.resolve(__dirname, 'dist'),
    },
    mode: isDev ? 'development' : 'production',
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
