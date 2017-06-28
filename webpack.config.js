var webpack = require('webpack'),
    bourbon = require('bourbon');

module.exports = {
  devtool: 'source-map',
  entry: {
    'js/main.js': './src/js/main.js',
    '__discard__/css/main.css.js': './src/sass/main.scss',
    '__discard__/css/svg.css.js': './src/sass/svg.scss'
  },
  output: {
    path: __dirname + '/build',
    filename: '[name]'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: require.resolve('snapsvg'),
        loader: 'imports-loader?this=>window,fix=>module.exports=0'
      },
      {
        test: /\.peg$/,
        loader: require.resolve('./lib/canopy-loader')
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: 'file?name=css/[name].css!extract!css!sass?includePaths[]=' + bourbon.includePaths
      }
    ]
  }
};
