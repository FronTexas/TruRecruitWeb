var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: "./js/client.js",
  output: {
    path: __dirname,
    filename: "client.min.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        }
      },
      { 
        test: /\.(png|jpg)$/, 
        loader: 'url-loader?limit=8192' 
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : false,
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ]
};
