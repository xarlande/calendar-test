module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/airbnb',
        '@vue/typescript/recommended',
    ],
    parserOptions: {
        ecmaVersion: 2020,
    },
    rules: {
        'max-len': 'off',
        'vue/multi-word-component-names': 'off',
        'no-shadow': 'off',
        'vue/no-reserved-component-names': 'off',
        'import/no-extraneous-dependencies': 'off',
        'vue/no-multiple-template-root': 'off',
        'import/no-unresolved': 'off',
        'vue/no-v-model-argument': 'off',
        'import/extensions': [
            'error', 'ignorePackages', {
                js: 'never',
                jsx: 'never',
                ts: 'never',
                tsx: 'never',
            },
        ],
        indent: ['error', 4],
        'vue/html-indent': ['error', 4],
        'vue/no-mutating-props': 'off',
        'no-console': 'warn',
        'prefer-destructuring': 'off',
        'global-require': 0,
        'no-unused-vars': 'off',
        'no-param-reassign': 'off',
    },
};
