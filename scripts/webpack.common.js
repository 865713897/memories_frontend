const path = require('path');

const isDev = process.env.NODE_ENV === 'development';

const getCssLoader = (cssModule = false) => {
  const cssLoader = [
    'style-loader',
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
    'style-loader',
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
          plugins: [
            require('postcss-flexbugs-fixes'),
            require('postcss-preset-env')({
              autoprefixer: {
                grid: true,
                flexbox: 'no-2009',
              },
              stage: 3,
            }),
            require('postcss-normalize'),
          ],
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

// const getLessLoader = (cssModule = false) => {};

module.exports = {
  entry: {
    app: path.resolve(__dirname, '../src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].boundle.js',
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
    // antd: 'antd',
  },
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
