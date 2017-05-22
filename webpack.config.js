const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
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
        test: /\.(sketch|png)$/,
        loaders: ["file-loader"]
      },
    ]
    
  },
  resolve: {
    extensions: [".js", 'jsx', ".json"],
  },
  plugins: [new HtmlWebpackPlugin()],
};