import rootConfig from '../../eslint.config.js'

export default [
    ...rootConfig,
    {
        files: ['**/*.{ts,tsx}'],
        rules: {
            // Storybook specific overrides
            'react-refresh/only-export-components': 'off', // Not needed for Storybook
            // Allow console in Storybook stories
            'no-console': 'warn',
            // Allow any types in stories for flexibility
            '@typescript-eslint/no-explicit-any': 'off',
        },
    },
]
