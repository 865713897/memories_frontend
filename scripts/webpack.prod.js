const common = require('./webpack.common');
const { merge } = require('webpack-merge');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const WebpackBar = require('webpackbar');
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const args = process.argv.slice(2);

console.log(args, 'args');

module.exports = merge(common, {
  mode: 'production',
});

// module.exports = {
//   ...common,
//   mode: 'production',
//   plugins: [
//     new HtmlWebpackPlugin({
//       template: resolve(__dirname, '../public/index.html'),
//       filename: 'index.html',
//       cache: false, // 特别重要：防止之后使用v6版本 copy-webpack-plugin 时代码修改一刷新页面为空问题。
//       minify: {
//         removeAttributeQuotes: true,
//         collapseWhitespace: true,
//         removeComments: true,
//         collapseBooleanAttributes: true,
//         collapseInlineTagWhitespace: true,
//         removeRedundantAttributes: true,
//         removeScriptTypeAttributes: true,
//         removeStyleLinkTypeAttributes: true,
//         minifyCSS: true,
//         minifyJS: true,
//         minifyURLs: true,
//         useShortDoctype: true,
//       },
//     }),
//     new WebpackBar({
//       name: '启动',
//       color: '#2f54eb',
//     }),
//     new BundleAnalyzerPlugin({
//       analyzerMode: 'server', // 开一个本地服务查看报告
//       analyzerHost: '127.0.0.1', // host 设置
//       analyzerPort: 8888, // 端口号设置
//     }),
//   ],
// };
