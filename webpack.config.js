const path = require('path')
const srcPath = path.join(__dirname, 'src')
const releasePath = path.join(__dirname, 'release')
const editorPath = path.join(__dirname, 'editor')

process.noDeprecation = true

module.exports = {
  entry: {
    wnako3: path.join(srcPath, 'wnako3.js'), // plugin_system+plugin_browser含む
    plugin_turtle: path.join(srcPath, 'plugin_turtle.js'),
    editor: path.join(editorPath, 'edit_main.jsx')
  },

  output: {
    path: releasePath,
    filename: '[name].js'
  },

  devtool: 'cheap-module-eval-source-map',

  module: {
    loaders: [
      // .jsx file
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        include: [editorPath, srcPath],
        query: {
          presets: ['env', 'react']
        }
      },
      // .js file
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,
        include: [srcPath],
        query: {
          presets: ['env']
        }
      }
    ]
  },

  resolve: {
    extensions: ['*', '.webpack.js', '.web.js', '.js', '.jsx']
  }
}
