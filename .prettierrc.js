module.exports = {
  semi: true,
  trailingComma: 'all',
  singleQuote: true,
  printWidth: 80, // It used for Reformat in Prettier command,
                  // not for output errors in linter.
  tabWidth: 2,
  proseWrap: 'always',
  endOfLine: 'lf',
  useTabs: false,
  overrides: [
    {
      files: '*.tsx',
      options: {
        printWidth: 80,
      },
    },
  ],
};
