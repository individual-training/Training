module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'no-unused-expressions': [0],
    'import/no-unresolved': [0],
    'no-empty-pattern': [0],
    'react/prop-types': [0],
    'global-require': [0],
    'import/no-dynamic-require': [0],
    'react/destructuring-assignment': [0],
    'react/jsx-filename-extension': [0],
  },
};
