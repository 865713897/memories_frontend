const { resolve } = require('path');
const common = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');

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
    new WebpackBar({
      name: '启动',
      color: '#2f54eb',
    }),
  ],
  devServer: {
    host: '127.0.0.1',
    open: true,
    port: '3001',
    hot: true, // 热更新
    proxy: {
      '/api/v1': {
        target: 'http://localhost:8080/',
      },
    },
  },
};
