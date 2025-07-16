import rootConfig from '../../eslint.config.js'

export default [
    ...rootConfig,
    {
        files: ['**/*.{ts,tsx}'],
        rules: {
            // Next.js specific overrides
            'react-refresh/only-export-components': 'off', // Not needed for Next.js
            // Allow console in development
            'no-console':
                process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        },
    },
]
