export const module = {
    env: {
        es2021: true,
        node: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react-hooks/recommended',
        './node_modules/ts-standard/eslintrc.json',
    ],
    parser:'@typescript-eslint/parser',
    parserOptions: {
    plugins: ['react-refresh'],
        ecmaVersion: 'latest',
        'react-refresh/only-export-components': 'warn',
        'react/react-in-jsx-scope': 'off',
    },
    plugin:['react-refresh'],
    rules: {
        'react-refresh/only-export-components': 'warn',
        'React is declared but its value is never read': 'off',
        
    }
}