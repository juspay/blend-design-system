import type { Preview } from '@storybook/react-vite'
import React from 'react'
import { DocsContainer } from '@storybook/addon-docs/blocks'
import './fonts.css'
import './global.css'

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/,
            },
        },
        options: {
            storySort: {
                method: 'alphabetical',
                order: [],
                locales: 'en-US',
            },
        },
        docs: {
            description: {
                component: 'Blend Design System Components',
            },
            source: {
                type: 'dynamic',
                language: 'tsx',
                dark: true,
            },
        },
        backgrounds: {
            options: {
                light: {
                    name: 'light',
                    value: '#ffffff',
                },

                dark: {
                    name: 'dark',
                    value: '#1a1a1a',
                },

                gray: {
                    name: 'gray',
                    value: '#f5f5f5',
                },
            },
        },
        viewport: {
            options: {
                mobile: {
                    name: 'Mobile',
                    styles: {
                        width: '375px',
                        height: '667px',
                    },
                },
                tablet: {
                    name: 'Tablet',
                    styles: {
                        width: '768px',
                        height: '1024px',
                    },
                },
                desktop: {
                    name: 'Desktop',
                    styles: {
                        width: '1200px',
                        height: '800px',
                    },
                },
            },
        },
    },

    decorators: [
        (Story) => (
            <div style={{ padding: '20px' }}>
                <Story />
            </div>
        ),
    ],

    globalTypes: {
        theme: {
            description: 'Global theme for components',
            defaultValue: 'light',
            toolbar: {
                title: 'Theme',
                icon: 'circlehollow',
                items: ['light', 'dark'],
                dynamicTitle: true,
            },
        },
    },

    initialGlobals: {
        backgrounds: {
            value: 'light',
        },
    },
}

export default preview
