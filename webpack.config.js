var path = require('path');
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    "index": "./app.js"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js",
    chunkFilename: "[name].js"
  },
  plugins: [
    new HtmlWebpackPlugin({ // 构建html文件
      template: "./index.html", // 模板文件路径
      inject: true,
    }),
  ],
  devServer: {
    compress: true,
    // port: env.port,
    hot: true
  },  
  devtool: 'source-map'
};