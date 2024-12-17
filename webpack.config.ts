/* eslint-disable @typescript-eslint/no-var-requires */
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

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
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [{ from: 'public', to: '.' }],
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src/'),
    },
  },
};
