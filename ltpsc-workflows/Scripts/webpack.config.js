var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/main'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/assets/'
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.tsx'],
    plugins: [
        new webpack.ResolverPlugin(
            new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin(".bower.json", ["main"])
        )
    ]
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loaders: ['awesome-typescript-loader'],
      include: path.join(__dirname, 'src')
    }]
  }
};