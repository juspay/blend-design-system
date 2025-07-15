import rootConfig from '../../eslint.config.js'

export default [
    ...rootConfig,
    {
        files: ['**/*.{ts,tsx}'],
        rules: {
            'react-refresh/only-export-components': 'off', // Not needed for Next.js
            'no-console':
                process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        },
    },
]
