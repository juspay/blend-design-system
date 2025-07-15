import rootConfig from '../../eslint.config.js'

export default [
    ...rootConfig,
    {
        files: ['**/*.{ts,tsx}'],
        rules: {
            'react-refresh/only-export-components': 'off',
            'no-console': 'warn',
            'react-hooks/rules-of-hooks': 'warn',
            'react-hooks/exhaustive-deps': 'warn',
        },
    },
    {
        files: [
            '**/Previews/**/*.{ts,tsx}',
            '**/components/Previews/**/*.{ts,tsx}',
        ],
        rules: {
            'no-console': 'off',
            'react-hooks/exhaustive-deps': 'off',
        },
    },
    {
        files: ['**/utils/**/*.{ts,tsx}', '**/docs/**/*.{ts,tsx}'],
        rules: {
            'react-hooks/rules-of-hooks': 'off',
        },
    },
]
