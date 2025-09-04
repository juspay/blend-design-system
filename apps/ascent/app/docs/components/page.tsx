import React from 'react'
import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import { COMPONENT_REGISTRY } from '@/docs/components'
import {
    DOCS_CONFIG,
    COMPONENT_CARD_STYLES,
    PAGE_LAYOUT,
    ARROW_ICON_PATH,
} from '@/docs/config'

// Component categories
const COMPONENT_CATEGORIES = {
    'Form Inputs': [
        'textinput',
        'numberinput',
        'searchinput',
        'textarea',
        'checkbox',
        'radio',
        'switch',
        'otpinput',
        'unitinput',
        'dropdowninput',
        'multivalueinput',
    ],
    Selection: ['single-select', 'multi-select', 'daterangepicker'],
    Actions: ['button', 'button-group'],
    Navigation: ['breadcrumb', 'tabs', 'sidebar', 'menu'],
    Layout: ['accordion', 'drawer', 'modal'],
    Feedback: ['alert', 'snackbar', 'tooltip', 'popover'],
    Display: [
        'avatar',
        'avatar-group',
        'tag',
        'split-tag',
        'stat-card',
        'progressbar',
    ],
    Data: ['data-table', 'charts'],
    Uncategorized: [], // For components not in any category
}

// Get list of components that have documentation - server-side
async function getDocumentedComponents() {
    const componentsDir = path.join(
        process.cwd(),
        'app',
        'docs',
        'content',
        'components'
    )

    try {
        const files = fs.readdirSync(componentsDir)
        const documentedSlugs = files
            .filter((file) => file.endsWith('.mdx') && file !== 'page.mdx')
            .map((file) => file.replace('.mdx', ''))

        console.log('📋 Found documented components:', documentedSlugs)

        // Create component objects for documented components
        const documentedComponents = documentedSlugs.map((slug) => {
            // Try to find in COMPONENT_REGISTRY first
            const registryComponent = COMPONENT_REGISTRY.find(
                (comp) => comp.slug === slug
            )

            if (registryComponent) {
                return registryComponent
            }

            // If not in registry, create a basic component object with specific icon
            const getComponentIcon = (slug: string) => {
                const iconMap: { [key: string]: React.ReactElement } = {
                    // Form Inputs
                    textinput: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('rect', {
                            x: '3',
                            y: '6',
                            width: '18',
                            height: '12',
                            rx: '2',
                        }),
                        React.createElement('path', { d: 'M7 10h10' })
                    ),
                    numberinput: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('rect', {
                            x: '3',
                            y: '6',
                            width: '18',
                            height: '12',
                            rx: '2',
                        }),
                        React.createElement('path', { d: 'M8 10h2v4' }),
                        React.createElement('path', { d: 'M12 10h4v4h-4z' })
                    ),
                    searchinput: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('circle', {
                            cx: '11',
                            cy: '11',
                            r: '8',
                        }),
                        React.createElement('path', { d: 'M21 21l-4.35-4.35' })
                    ),
                    textarea: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('rect', {
                            x: '3',
                            y: '3',
                            width: '18',
                            height: '18',
                            rx: '2',
                        }),
                        React.createElement('path', { d: 'M7 7h10' }),
                        React.createElement('path', { d: 'M7 11h8' }),
                        React.createElement('path', { d: 'M7 15h6' })
                    ),
                    checkbox: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('rect', {
                            x: '3',
                            y: '3',
                            width: '18',
                            height: '18',
                            rx: '2',
                        }),
                        React.createElement('path', { d: 'M9 12l2 2l4-4' })
                    ),
                    radio: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('circle', {
                            cx: '12',
                            cy: '12',
                            r: '10',
                        }),
                        React.createElement('circle', {
                            cx: '12',
                            cy: '12',
                            r: '4',
                            fill: 'currentColor',
                        })
                    ),
                    switch: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('rect', {
                            x: '3',
                            y: '8',
                            width: '18',
                            height: '8',
                            rx: '4',
                        }),
                        React.createElement('circle', {
                            cx: '16',
                            cy: '12',
                            r: '3',
                        })
                    ),
                    otpinput: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('rect', {
                            x: '2',
                            y: '6',
                            width: '4',
                            height: '12',
                            rx: '1',
                        }),
                        React.createElement('rect', {
                            x: '7',
                            y: '6',
                            width: '4',
                            height: '12',
                            rx: '1',
                        }),
                        React.createElement('rect', {
                            x: '12',
                            y: '6',
                            width: '4',
                            height: '12',
                            rx: '1',
                        }),
                        React.createElement('rect', {
                            x: '17',
                            y: '6',
                            width: '4',
                            height: '12',
                            rx: '1',
                        })
                    ),
                    unitinput: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('rect', {
                            x: '3',
                            y: '6',
                            width: '18',
                            height: '12',
                            rx: '2',
                        }),
                        React.createElement('path', { d: 'M7 10h6' }),
                        React.createElement(
                            'text',
                            {
                                x: '15',
                                y: '15',
                                fontSize: '8',
                                fill: 'currentColor',
                            },
                            'kg'
                        )
                    ),
                    dropdowninput: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('rect', {
                            x: '3',
                            y: '6',
                            width: '18',
                            height: '12',
                            rx: '2',
                        }),
                        React.createElement('path', { d: 'M17 10l-2 2l-2-2' })
                    ),
                    multivalueinput: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('rect', {
                            x: '3',
                            y: '6',
                            width: '18',
                            height: '12',
                            rx: '2',
                        }),
                        React.createElement('rect', {
                            x: '6',
                            y: '9',
                            width: '3',
                            height: '2',
                            rx: '1',
                            fill: 'currentColor',
                        }),
                        React.createElement('rect', {
                            x: '10',
                            y: '9',
                            width: '3',
                            height: '2',
                            rx: '1',
                            fill: 'currentColor',
                        }),
                        React.createElement('rect', {
                            x: '14',
                            y: '9',
                            width: '3',
                            height: '2',
                            rx: '1',
                            fill: 'currentColor',
                        })
                    ),

                    // Selection
                    'single-select': React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('rect', {
                            x: '3',
                            y: '6',
                            width: '18',
                            height: '12',
                            rx: '2',
                        }),
                        React.createElement('path', { d: 'M19 10l-2 2l-2-2' })
                    ),
                    'multi-select': React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('rect', {
                            x: '3',
                            y: '6',
                            width: '18',
                            height: '12',
                            rx: '2',
                        }),
                        React.createElement('path', { d: 'M6 10l2 2l4-4' }),
                        React.createElement('path', { d: 'M19 10l-2 2l-2-2' })
                    ),
                    daterangepicker: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('rect', {
                            x: '3',
                            y: '4',
                            width: '18',
                            height: '18',
                            rx: '2',
                        }),
                        React.createElement('path', { d: 'M16 2v4' }),
                        React.createElement('path', { d: 'M8 2v4' }),
                        React.createElement('path', { d: 'M3 10h18' })
                    ),

                    // Navigation
                    breadcrumb: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('path', { d: 'M9 18l6-6l-6-6' }),
                        React.createElement('circle', {
                            cx: '5',
                            cy: '12',
                            r: '1',
                        }),
                        React.createElement('circle', {
                            cx: '19',
                            cy: '12',
                            r: '1',
                        })
                    ),
                    tabs: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('rect', {
                            x: '3',
                            y: '8',
                            width: '6',
                            height: '2',
                            rx: '1',
                        }),
                        React.createElement('rect', {
                            x: '10',
                            y: '8',
                            width: '6',
                            height: '2',
                            rx: '1',
                        }),
                        React.createElement('rect', {
                            x: '3',
                            y: '12',
                            width: '18',
                            height: '8',
                            rx: '1',
                        })
                    ),
                    sidebar: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('rect', {
                            x: '3',
                            y: '3',
                            width: '18',
                            height: '18',
                            rx: '2',
                        }),
                        React.createElement('path', { d: 'M9 3v18' })
                    ),
                    menu: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('path', { d: 'M3 12h18' }),
                        React.createElement('path', { d: 'M3 6h18' }),
                        React.createElement('path', { d: 'M3 18h18' })
                    ),

                    // Layout
                    accordion: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('rect', {
                            x: '3',
                            y: '3',
                            width: '18',
                            height: '18',
                            rx: '2',
                        }),
                        React.createElement('path', { d: 'M9 9h6' }),
                        React.createElement('path', { d: 'M9 15h6' }),
                        React.createElement('path', { d: 'M12 9v6' })
                    ),
                    drawer: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('rect', {
                            x: '3',
                            y: '3',
                            width: '18',
                            height: '18',
                            rx: '2',
                        }),
                        React.createElement('path', { d: 'M15 3v18' }),
                        React.createElement('path', { d: 'M17 9l2 0' }),
                        React.createElement('path', { d: 'M17 15l2 0' })
                    ),
                    modal: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('rect', {
                            x: '3',
                            y: '3',
                            width: '18',
                            height: '18',
                            rx: '2',
                        }),
                        React.createElement('rect', {
                            x: '7',
                            y: '7',
                            width: '10',
                            height: '10',
                            rx: '1',
                        })
                    ),

                    // Feedback
                    alert: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('path', {
                            d: 'M21.73 18l-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z',
                        }),
                        React.createElement('path', { d: 'M12 9v4' }),
                        React.createElement('path', { d: 'M12 17h.01' })
                    ),
                    snackbar: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('rect', {
                            x: '2',
                            y: '17',
                            width: '20',
                            height: '4',
                            rx: '2',
                        }),
                        React.createElement('circle', {
                            cx: '7',
                            cy: '19',
                            r: '1',
                        }),
                        React.createElement('path', { d: 'M11 19h8' })
                    ),
                    tooltip: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('rect', {
                            x: '3',
                            y: '3',
                            width: '18',
                            height: '10',
                            rx: '2',
                        }),
                        React.createElement('path', {
                            d: 'M12 13l-2 4h4l-2-4z',
                        })
                    ),
                    popover: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('rect', {
                            x: '3',
                            y: '3',
                            width: '18',
                            height: '12',
                            rx: '2',
                        }),
                        React.createElement('path', { d: 'M9 15l3 3l3-3' })
                    ),

                    // Display
                    avatar: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('circle', {
                            cx: '12',
                            cy: '12',
                            r: '10',
                        }),
                        React.createElement('path', {
                            d: 'M8 14s1.5 2 4 2s4-2 4-2',
                        }),
                        React.createElement('path', { d: 'M9 9h.01' }),
                        React.createElement('path', { d: 'M15 9h.01' })
                    ),
                    'avatar-group': React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('circle', {
                            cx: '9',
                            cy: '12',
                            r: '7',
                        }),
                        React.createElement('circle', {
                            cx: '15',
                            cy: '12',
                            r: '7',
                        }),
                        React.createElement('path', {
                            d: 'M6 16s1 1.5 3 1.5s3-1.5 3-1.5',
                        })
                    ),
                    tag: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('path', {
                            d: 'M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z',
                        }),
                        React.createElement('path', { d: 'M7 7h.01' })
                    ),
                    'split-tag': React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('path', {
                            d: 'M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z',
                        }),
                        React.createElement('path', { d: 'M7 7h.01' }),
                        React.createElement('path', { d: 'M12 2v19' })
                    ),
                    'stat-card': React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('rect', {
                            x: '3',
                            y: '3',
                            width: '18',
                            height: '18',
                            rx: '2',
                        }),
                        React.createElement('path', { d: 'M7 8h10' }),
                        React.createElement('path', { d: 'M7 12h7' }),
                        React.createElement('path', { d: 'M7 16h4' })
                    ),
                    progressbar: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('rect', {
                            x: '3',
                            y: '10',
                            width: '18',
                            height: '4',
                            rx: '2',
                        }),
                        React.createElement('rect', {
                            x: '3',
                            y: '10',
                            width: '12',
                            height: '4',
                            rx: '2',
                            fill: 'currentColor',
                        })
                    ),

                    // Data
                    'data-table': React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('rect', {
                            x: '3',
                            y: '6',
                            width: '18',
                            height: '12',
                            rx: '2',
                        }),
                        React.createElement('path', { d: 'M3 10h18' }),
                        React.createElement('path', { d: 'M9 6v12' }),
                        React.createElement('path', { d: 'M15 6v12' })
                    ),
                    charts: React.createElement(
                        'svg',
                        {
                            width: '20',
                            height: '20',
                            viewBox: '0 0 24 24',
                            fill: 'none',
                            stroke: 'currentColor',
                            strokeWidth: '2',
                        },
                        React.createElement('path', {
                            d: 'M3 18v-6a9 9 0 0 1 18 0v6',
                        }),
                        React.createElement('path', {
                            d: 'M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3z',
                        }),
                        React.createElement('path', {
                            d: 'M9 19a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v3z',
                        })
                    ),
                }

                return (
                    iconMap[slug] ||
                    React.createElement('div', {
                        className: 'w-5 h-5 bg-gray-400 rounded',
                    })
                )
            }

            return {
                slug,
                title: slug
                    .split('-')
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(' '),
                description: `${slug.charAt(0).toUpperCase() + slug.slice(1)} component documentation`,
                icon: getComponentIcon(slug),
                color: 'from-gray-500 to-gray-600',
            }
        })

        // Categorize components
        const categorizedComponents: {
            [key: string]: typeof documentedComponents
        } = {}

        // Initialize all categories
        Object.keys(COMPONENT_CATEGORIES).forEach((category) => {
            categorizedComponents[category] = []
        })

        // Sort components into categories
        documentedComponents.forEach((component) => {
            let categorized = false

            for (const [category, slugs] of Object.entries(
                COMPONENT_CATEGORIES
            )) {
                if (slugs.includes(component.slug)) {
                    categorizedComponents[category].push(component)
                    categorized = true
                    break
                }
            }

            // If not found in any category, add to Uncategorized
            if (!categorized) {
                categorizedComponents['Uncategorized'].push(component)
            }
        })

        // Remove empty categories
        Object.keys(categorizedComponents).forEach((category) => {
            if (categorizedComponents[category].length === 0) {
                delete categorizedComponents[category]
            }
        })

        return categorizedComponents
    } catch (error) {
        console.error('Error reading components directory:', error)
        return {}
    }
}

const page = async () => {
    const categorizedComponents = await getDocumentedComponents()
    const totalComponents = Object.values(categorizedComponents).flat().length

    return (
        <div className={PAGE_LAYOUT.wrapper}>
            <div className={PAGE_LAYOUT.content}>
                <article className={PAGE_LAYOUT.article}>
                    <h1 className={PAGE_LAYOUT.title}>Components</h1>
                    <p className={PAGE_LAYOUT.subtitle}>
                        Explore all available components in Blend Design System.
                        Production-ready React components with TypeScript
                        support and comprehensive documentation.
                    </p>

                    {totalComponents > 0 ? (
                        <div className="space-y-12">
                            {Object.entries(categorizedComponents).map(
                                ([category, components]) => (
                                    <section
                                        key={category}
                                        className="space-y-6"
                                    >
                                        <div className="border-b border-[var(--border)] pb-3">
                                            <h2 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                                                {category}
                                            </h2>
                                            <p className="text-sm text-[var(--muted-foreground)] mt-1">
                                                {components.length} component
                                                {components.length !== 1
                                                    ? 's'
                                                    : ''}
                                            </p>
                                        </div>

                                        <div className={PAGE_LAYOUT.grid}>
                                            {components.map((component) => (
                                                <Link
                                                    key={component.slug}
                                                    href={`/docs/components/${component.slug}`}
                                                    className={
                                                        COMPONENT_CARD_STYLES.container
                                                    }
                                                    data-nav-content
                                                >
                                                    <div
                                                        className={
                                                            COMPONENT_CARD_STYLES.content
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                COMPONENT_CARD_STYLES.iconContainer
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    COMPONENT_CARD_STYLES.iconColor
                                                                }
                                                            >
                                                                {component.icon}
                                                            </div>
                                                        </div>
                                                        <div
                                                            className={
                                                                COMPONENT_CARD_STYLES.textContainer
                                                            }
                                                        >
                                                            <h3
                                                                className={
                                                                    COMPONENT_CARD_STYLES.title
                                                                }
                                                            >
                                                                {
                                                                    component.title
                                                                }
                                                            </h3>
                                                            <p
                                                                className={
                                                                    COMPONENT_CARD_STYLES.description
                                                                }
                                                            >
                                                                {
                                                                    component.description
                                                                }
                                                            </p>
                                                        </div>
                                                        <div
                                                            className={
                                                                COMPONENT_CARD_STYLES.arrow
                                                            }
                                                        >
                                                            <svg
                                                                width="16"
                                                                height="16"
                                                                viewBox="0 0 24 24"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                strokeWidth="2"
                                                                className={
                                                                    COMPONENT_CARD_STYLES.arrowIcon
                                                                }
                                                            >
                                                                <path
                                                                    d={
                                                                        ARROW_ICON_PATH
                                                                    }
                                                                />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                        </div>
                                    </section>
                                )
                            )}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <p className="text-[var(--muted-foreground)]">
                                No component documentation available yet.
                            </p>
                        </div>
                    )}
                </article>
            </div>
            <div className={PAGE_LAYOUT.toc}>
                <div className={PAGE_LAYOUT.tocSticky}>
                    {/* Empty TOC space to maintain layout consistency */}
                </div>
            </div>
        </div>
    )
}

export default page
