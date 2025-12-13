import type { StorybookConfig } from '@storybook/react-webpack5';
import path from 'path';

const __dirname = import.meta.dirname;

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: '@storybook/addon-styling-webpack',
      options: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: ['tailwindcss', 'autoprefixer'],
                  },
                },
              },
            ],
          },
        ],
      },
    },
  ],
  framework: {
    name: '@storybook/react-webpack5',
    options: {},
  },
  docs: {},
  webpackFinal: async (config) => {
    // Path alias 설정
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
      };

      // TypeScript 확장자 추가
      config.resolve.extensions = [
        ...(config.resolve.extensions || []),
        '.ts',
        '.tsx',
      ];
    }

    // TypeScript 처리를 위한 babel-loader 설정
    config.module?.rules?.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              ['@babel/preset-react', { runtime: 'automatic' }],
              '@babel/preset-typescript',
            ],
          },
        },
      ],
    });

    return config;
  },
};

export default config;
