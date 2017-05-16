const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: [
          /node_modules/
        ],
        loaders: ["babel-loader"]
      },
      {
        test: /\.styl$/,
        loaders: ['style-loader', 'css-loader', "stylus-loader"]
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png)$/,
        loaders: ["file-loader?name=[name].[ext]&outputPath=images/"]
      },
    ]
    
  },
  resolve: {
    extensions: [".js", 'jsx', ".json"],
  },
  plugins: [new HtmlWebpackPlugin({
    template: 'index.html'
  })],
};