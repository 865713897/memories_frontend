const webpack = require('webpack');
const common = require('./webpack.common');
const merge = require('webpack-merge');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    open: true,
    compress: true,
    hot: true, // 热更新
    proxy: {
      '/api/v1': {
        target: 'http://localhost:8080/',
      },
    },
  },
});
