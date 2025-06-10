/* eslint-disable @typescript-eslint/no-var-requires */
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'production',
  entry: {
    'content-scripts': path.join(__dirname, 'src/app/content-scripts.tsx'),
    'service-worker': path.join(__dirname, 'src/app/service-worker.ts'),
    'side-panel': path.join(__dirname, 'src/app/side-panel.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'), // 번들링된 파일의 저장 경로
    filename: '[name].js', // 번들링된 JavaScript 파일의 이름
    publicPath: 'chrome-extension://__MSG_@@extension_id__/', // 크롬 확장 프로그램 파일 경로 설정 (런타임에 실제 익스텐션 ID로 대체)
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
      {
        test: /\.(tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images',
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public', to: '.' }],
    }),
    new Dotenv(),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
};
