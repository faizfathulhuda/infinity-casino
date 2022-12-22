module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/vue3-essential', 'plugin:vue/vue3-recommended', 'eslint:recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  plugins: ['simple-import-sort'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/html-indent': ['warn', 2],
    'simple-import-sort/imports': 'error',
    'vue/multi-word-component-names': 'off',
    'vue/html-quotes': ['error', 'double'],
    'arrow-body-style': [2, 'as-needed'],
    'class-methods-use-this': 2,
    'comma-dangle': [2, 'never'],
    'max-len': 0,
    // eslint-disable-next-line
    'linebreak-style': ['error', require('os').EOL === '\r\n' ? 'windows' : 'unix'],
    'newline-per-chained-call': 0,
    'no-confusing-arrow': 0,
    'no-use-before-define': 1,
    'no-useless-catch': 'off',
    'prefer-template': 2,
    'prefer-const': [
      2,
      {
        destructuring: 'any',
        ignoreReadBeforeAssign: false
      }
    ],
    semi: ['error', 'never'],
    quotes: ['warn', 'single'],
    indent: [
      2,
      2,
      {
        SwitchCase: 1
      }
    ]
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true
      }
    }
  ]
}
