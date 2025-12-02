module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'import'],
  settings: {
    'import/resolver': {
      typescript: true,
      node: true,
    },
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          // Cross-context import restrictions
          {
            target: './src/content-script',
            from: './src/side-panel',
            message: 'content-script cannot import from side-panel',
          },
          {
            target: './src/side-panel',
            from: './src/content-script',
            message: 'side-panel cannot import from content-script',
          },
          // FSD layer restrictions for content-script
          {
            target: './src/content-script/shared',
            from: './src/content-script/!(shared)/**',
            message:
              'shared layer cannot import from upper layers (entities, features, pages, widgets, app)',
          },
          {
            target: './src/content-script/entities',
            from: './src/content-script/!(shared|entities)/**',
            message: 'entities layer can only import from shared',
          },
          {
            target: './src/content-script/features',
            from: './src/content-script/!(shared|entities|features)/**',
            message: 'features layer can only import from shared and entities',
          },
          {
            target: './src/content-script/widgets',
            from: './src/content-script/!(shared|entities|features|widgets)/**',
            message:
              'widgets layer can only import from shared, entities, and features',
          },
          {
            target: './src/content-script/pages',
            from: './src/content-script/app/**',
            message: 'pages layer cannot import from app layer',
          },
          // FSD layer restrictions for side-panel
          {
            target: './src/side-panel/shared',
            from: './src/side-panel/!(shared)/**',
            message:
              'shared layer cannot import from upper layers (entities, features, pages, widgets, app)',
          },
          {
            target: './src/side-panel/entities',
            from: './src/side-panel/!(shared|entities)/**',
            message: 'entities layer can only import from shared',
          },
          {
            target: './src/side-panel/features',
            from: './src/side-panel/!(shared|entities|features)/**',
            message: 'features layer can only import from shared and entities',
          },
          {
            target: './src/side-panel/widgets',
            from: './src/side-panel/!(shared|entities|features|widgets)/**',
            message:
              'widgets layer can only import from shared, entities, and features',
          },
          {
            target: './src/side-panel/pages',
            from: './src/side-panel/app/**',
            message: 'pages layer cannot import from app layer',
          },
        ],
      },
    ],
  },
};
