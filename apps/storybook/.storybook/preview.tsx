import type { Preview } from '@storybook/react'
import React from 'react'
import './global.css'
import {
    useOf,
    Title,
    Primary,
    Description,
    Controls,
    Stories,
} from '@storybook/blocks'
import {
    BLEND_MESSAGES,
    ThemeProvider,
    type BlendTranslate,
} from '@juspay/blend-design-system'

/**
 * Not a real BCP 47 tag — a sentinel for the pseudo-locale toolbar entry.
 * The provider still gets `'en-US'` so `Intl` has real data to format with.
 */
const PSEUDO_LOCALE = 'pseudo'

const ACCENTS: Record<string, string> = {
    a: 'á',
    e: 'é',
    i: 'í',
    o: 'ó',
    u: 'ú',
    A: 'Á',
    E: 'É',
    I: 'Í',
    O: 'Ó',
    U: 'Ú',
}

/**
 * Brackets and accents every string Blend resolves through the catalog.
 *
 * This is the cheapest way to find unlocalized copy: anything still rendering
 * plain unbracketed English is a hardcoded literal that has not been migrated
 * yet. The accents also widen the text, which surfaces layout that only fits
 * English.
 *
 * `{placeholder}` spans are left intact so Blend's own interpolation pass can
 * still fill them.
 */
const pseudoTranslate: BlendTranslate = (key) => {
    const source = BLEND_MESSAGES[key as keyof typeof BLEND_MESSAGES]
    if (source === undefined) return undefined

    const accented = source.replace(/[^{}]+|\{[A-Za-z0-9_]+\}/g, (segment) =>
        segment.startsWith('{')
            ? segment
            : segment.replace(/[aeiouAEIOU]/g, (c) => ACCENTS[c] ?? c)
    )

    return `⟦${accented}⟧`
}

const preview: Preview = {
    parameters: {
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
            page: () => {
                const CustomDocsPage = () => {
                    const resolvedOf = useOf('meta')
                    const subtitle =
                        resolvedOf.type === 'meta'
                            ? resolvedOf.csfFile.meta?.parameters?.docsSubtitle
                            : undefined

                    return (
                        <>
                            <Title />

                            {subtitle && (
                                <div className="text-gray-600 font-manrope tracking-wide leading-7">
                                    {subtitle}
                                </div>
                            )}

                            <Primary />
                            <Controls />
                            <Description />
                            <Stories includePrimary={false} title="Use Cases" />
                        </>
                    )
                }

                return <CustomDocsPage />
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
        (Story, context) => {
            const locale = (context.globals.locale as string) ?? 'en-US'

            return (
                <ThemeProvider
                    locale={locale === PSEUDO_LOCALE ? 'en-US' : locale}
                    t={locale === PSEUDO_LOCALE ? pseudoTranslate : undefined}
                >
                    <div className="p-5">
                        <Story />
                    </div>
                </ThemeProvider>
            )
        },
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
        locale: {
            description:
                'Locale passed to ThemeProvider. "pseudo" accents and brackets every resolved string, so anything still rendering plain English is unlocalized.',
            defaultValue: 'en-US',
            toolbar: {
                title: 'Locale',
                icon: 'globe',
                items: [
                    { value: 'en-US', title: 'English (US)' },
                    { value: 'de-DE', title: 'German — long words' },
                    { value: 'fr-FR', title: 'French' },
                    { value: 'ja-JP', title: 'Japanese — CJK widths' },
                    { value: 'ar-EG', title: 'Arabic — digits, Sunday-first' },
                    { value: PSEUDO_LOCALE, title: 'Pseudo-locale' },
                ],
                dynamicTitle: true,
            },
        },
    },
}

export default preview
