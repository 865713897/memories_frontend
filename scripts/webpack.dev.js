const { resolve } = require('path');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  ...common,
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      cache: false,
    }),
  ],
  devServer: {
    host: '127.0.0.1',
    open: true,
    port: '3001',
    hot: true, // 热更新
  },
};
