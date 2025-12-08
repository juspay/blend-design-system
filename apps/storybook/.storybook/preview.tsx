import type { Preview } from '@storybook/react'
import React from 'react'
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
        },
        a11y: {
            config: {
                rules: [
                    {
                        id: 'color-contrast',
                        enabled: true,
                    },
                    {
                        id: 'keyboard-navigation',
                        enabled: true,
                    },
                    {
                        id: 'aria-required-attributes',
                        enabled: true,
                    },
                    {
                        id: 'aria-hidden-focus',
                        enabled: true,
                    },
                    {
                        id: 'button-name',
                        enabled: true,
                    },
                    {
                        id: 'link-name',
                        enabled: true,
                    },
                    {
                        id: 'nested-interactive',
                        enabled: false,
                    },
                    {
                        id: 'focus-order-semantics',
                        enabled: false,
                    },
                    {
                        id: 'tabindex',
                        enabled: false,
                    },
                ],
            },
            options: {
                checks: { 'color-contrast': { options: { noScroll: true } } },
                restoreScroll: true,
                // Run WCAG 2.2 rules (latest standard) - includes 2.0, 2.1, and 2.2 success criteria
                runOnly: {
                    type: 'tag',
                    values: [
                        'wcag2a',
                        'wcag2aa',
                        'wcag21aa',
                        'wcag22aa',
                        'wcag22aaa',
                    ],
                },
            },
        },
        // Chromatic configuration
        // Note: Chromatic doesn't support viewports and modes together
        // Use viewports globally, and configure modes per-story if needed
        chromatic: {
            viewports: [375, 768, 1200],
        },
        backgrounds: {
            default: 'light',
            values: [
                {
                    name: 'light',
                    value: '#ffffff',
                },
                {
                    name: 'dark',
                    value: '#1a1a1a',
                },
                {
                    name: 'gray',
                    value: '#f5f5f5',
                },
            ],
        },
        viewport: {
            viewports: {
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
}

export default preview
