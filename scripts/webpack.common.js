const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const WebpackBar = require('webpackbar');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const autoprefixer = require('autoprefixer');

const getCssLoader = (cssModule = false) => {
  const cssLoader = [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: false,
        sourceMap: isDev,
        importLoaders: 1, // 需要先被 sass-loader 处理，所以这里设置为 1
      },
    },
  ];
  if (cssModule) {
    cssLoader[1] = {
      loader: 'css-loader',
      options: {
        modules: { localIdentName: '[name]__[local]-[hash:base64:5]' },
        sourceMap: isDev,
        importLoaders: 1, // 需要先被 sass-loader 处理，所以这里设置为 1
      },
    };
  }
  return cssLoader;
};

const getScssLoader = (cssModule = false) => {
  const scssLodaer = [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: false,
        sourceMap: isDev,
        importLoaders: 1, // 需要先被 sass-loader 处理，所以这里设置为 1
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        postcssOptions: {
          plugins: [autoprefixer({ grid: true })],
        },
        sourceMap: isDev,
      },
    },
    {
      loader: 'sass-loader',
      options: {
        sourceMap: isDev,
      },
    },
  ];
  if (cssModule) {
    scssLodaer[1] = {
      loader: 'css-loader',
      options: {
        modules: { localIdentName: '[name]__[local]-[hash:base64:5]' },
        sourceMap: isDev,
        importLoaders: 1, // 需要先被 sass-loader 处理，所以这里设置为 1
      },
    };
  }
  return scssLodaer;
};

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    extensions: ['.jsx', '.js', '.json'],
    symlinks: false,
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      cache: false,
    }),
    new WebpackBar({
      name: isDev ? '启动中...' : '打包中...',
      color: '#2f54eb',
    }),
    !isDev &&
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: '[name].[hash].css',
        ignoreOrder: false,
      }),
  ].filter(Boolean),
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        oneOf: [
          {
            resourceQuery: /css_modules/,
            use: getCssLoader(true),
          },
          {
            use: getCssLoader(false),
          },
        ],
      },
      {
        test: /\.scss$/,
        oneOf: [
          {
            resourceQuery: /css_modules/,
            use: getScssLoader(true),
          },
          {
            use: getScssLoader(false),
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } },
        ],
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10 * 1024,
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/images',
            },
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name].[contenthash:8].[ext]',
              outputPath: 'assets/fonts',
            },
          },
        ],
      },
    ],
  },
};
